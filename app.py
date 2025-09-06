import os
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional, Tuple

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Form, Body, Request
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, conint, constr, ValidationError
from pymongo import MongoClient
from pymongo.errors import OperationFailure, ConfigurationError, ServerSelectionTimeoutError
from bson import ObjectId
import re

# ================== ENV & DB ==================
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
if not MONGO_URI or not DB_NAME:
    raise RuntimeError("Please set MONGO_URI and DB_NAME in your .env")

def _connect_db() -> MongoClient:
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        client.admin.command("ping")
        return client
    except OperationFailure as e:
        raise RuntimeError("Mongo authentication failed. Check credentials, roles and DB_NAME.") from e
    except (ConfigurationError, ServerSelectionTimeoutError) as e:
        raise RuntimeError("Mongo configuration/network error (SRV/DNS/IP allowlist).") from e

mongo = _connect_db()
db = mongo[DB_NAME]

# ================== MODELS ==================
# Strict internal model (used by core planner)
class ItineraryRequest(BaseModel):
    stateId: constr(min_length=1)
    villageId: constr(min_length=1)
    people: conint(ge=1)
    budgetTotalINR: float = Field(gt=0)
    startDate: constr(pattern=r"^\d{4}-\d{2}-\d{2}$")
    endDate: constr(pattern=r"^\d{4}-\d{2}-\d{2}$")

# Flexible API model (matches your frontend)
class ApiItineraryRequest(BaseModel):
    # Frontend sends: village (name), optional stateId, NO villageId
    stateId: Optional[str] = None
    villageId: Optional[str] = None  # we’ll accept this too if you add it later
    village: Optional[str] = None
    people: conint(ge=1)
    budgetTotalINR: float = Field(gt=0)
    startDate: constr(pattern=r"^\d{4}-\d{2}-\d{2}$")
    endDate: constr(pattern=r"^\d{4}-\d{2}-\d{2}$")
    interests: Optional[List[str]] = None  # accepted, not used yet

# ================== UTILS ==================
def to_date(iso: str) -> datetime:
    return datetime.strptime(iso, "%Y-%m-%d")

def as_money(x) -> float:
    try:
        return float(x)
    except:
        return 0.0

def time_to_min(t: str) -> int:
    h, m = t.split(":")
    return int(h) * 60 + int(m)

def overlaps(a_start: str, a_end: str, b_start: str, b_end: str) -> bool:
    a1, a2 = time_to_min(a_start), time_to_min(a_end)
    b1, b2 = time_to_min(b_start), time_to_min(b_end)
    return not (a2 <= b1 or b2 <= a1)

def _free_block() -> Dict[str, Any]:
    return {
        "type": "free_time",
        "ref_id": None,
        "name": "Free time",
        "start_time": "16:00",
        "end_time": "18:00",
        "notes": "Relax & explore locally.",
        "cost_breakdown": {"basis": "free", "quantity": 0, "unit_price": 0, "subtotal": 0},
    }

def recompute_totals(itinerary: dict) -> None:
    total = 0.0
    for day in itinerary["days"]:
        day_total = 0.0
        for item in day["items"]:
            cb = item["cost_breakdown"]
            qty = cb.get("quantity", 0) or 0
            unit = cb.get("unit_price", 0) or 0
            sub = float(qty) * float(unit)
            cb["subtotal"] = round(sub, 2)
            day_total += cb["subtotal"]
        day["day_estimated_cost"] = round(day_total, 2)
        total += day_total
    itinerary["total_estimated_cost"] = round(total, 2)

def _mk_output_item(src: dict, people: int) -> dict:
    basis = src["basis"]
    unit = float(src.get("unit_price", 0) or 0)
    qty = people if basis == "per_person" else (1 if basis == "per_group" else 0)
    return {
        "type": "activity",
        "ref_id": src.get("ref_id"),
        "name": src["name"],
        "start_time": src.get("start_time", "09:00"),
        "end_time": src.get("end_time", "11:00"),
        "notes": src.get("notes", "") or "Suggested activity.",
        "cost_breakdown": {"basis": basis, "quantity": qty, "unit_price": unit, "subtotal": round(qty * unit, 2)},
    }

def _conflict(day_items: List[dict], cand: dict) -> bool:
    """Return True if candidate conflicts with any existing non-free item, or overlaps our canonical free window."""
    if cand["type"] == "free_time":
        return False
    for it in day_items:
        if it["type"] == "free_time":
            if overlaps("16:00", "18:00", cand["start_time"], cand["end_time"]):
                return True
            continue
        if overlaps(it["start_time"], it["end_time"], cand["start_time"], cand["end_time"]):
            return True
    return False

def summarize(it: dict, people: int) -> str:
    acts = sum(1 for d in it["days"] for x in d["items"] if x["type"] == "activity")
    packed = sum(1 for d in it["days"] if len(d["items"]) >= 3)
    balanced = sum(1 for d in it["days"] if len(d["items"]) == 2)
    light = sum(1 for d in it["days"] if len(d["items"]) <= 1)
    return (f"Activities scheduled: {acts}. Packed days: {packed}, balanced: {balanced}, light: {light}. "
            f"Total for {people} traveler(s): ₹{int(it['total_estimated_cost']):,}.")

# ================== PLANNER (Activities only) ==================
SLOTS = [
    ("07:30", "09:00"),
    ("09:00", "11:00"),
    ("11:30", "13:30"),
    ("14:00", "16:00"),
    ("16:30", "18:30"),
    ("19:00", "21:00"),
]

def _mixed_caps(num_days: int, insert_light_every: int = 3) -> List[int]:
    caps = []
    for i in range(num_days):
        if (i + 1) % insert_light_every == 0:
            caps.append(1)
        else:
            caps.append(3 if i % 2 == 0 else 2)
    return caps

def _normalize_activities(raw: List[dict]) -> List[dict]:
    out = []
    for a in raw:
        st = a.get("start_time") or "09:00"
        en = a.get("end_time") or "11:00"
        out.append({
            "type": "activity",
            "ref_id": str(a["_id"]),
            "name": a["name"],
            "start_time": st,
            "end_time": en,
            "notes": a.get("description", "") or "Suggested activity.",
            "basis": a.get("price_type", "free"),
            "unit_price": float(a.get("price", 0) or 0),
            "pop": float(a.get("popularity_score", 0) or 0),
            "category": a.get("category"),
        })
    return out

def _diversify_for_group(acts: List[dict], people: int) -> List[dict]:
    if people < 4:
        return sorted(acts, key=lambda x: (-x["pop"], x["unit_price"]))
    return sorted(acts, key=lambda x: (-x["pop"], hash(x["name"]) % 7, x["unit_price"]))

def _next_slot(existing: List[dict]) -> Optional[tuple]:
    for st, en in SLOTS:
        if all(it["type"] == "free_time" or not overlaps(st, en, it["start_time"], it["end_time"]) for it in existing):
            return (st, en)
    return None

def _place_activity_with_slots(items: List[dict], cand: dict) -> Optional[dict]:
    st, en = cand["start_time"], cand["end_time"]
    probe = {"type": "activity", "start_time": st, "end_time": en}
    if not _conflict(items, probe):
        return {**cand, "start_time": st, "end_time": en}

    for st2, en2 in SLOTS:
        probe2 = {"type": "activity", "start_time": st2, "end_time": en2}
        if not _conflict(items, probe2):
            return {**cand, "start_time": st2, "end_time": en2}

    for i, it in enumerate(items):
        if it["type"] == "free_time":
            for st3, en3 in SLOTS:
                others = [x for j, x in enumerate(items) if j != i]
                probe3 = {"type": "activity", "start_time": st3, "end_time": en3}
                if not _conflict(others, probe3):
                    del items[i]
                    return {**cand, "start_time": st3, "end_time": en3}
            break
    return None

def plan_activities_only(people: int, start: datetime, end: datetime, budget: float,
                         activities_block: List[dict]) -> dict:
    # Build day list
    days = []
    d = start
    while d.date() <= end.date():
        days.append(d.date().isoformat())
        d += timedelta(days=1)

    caps = _mixed_caps(len(days), insert_light_every=3)
    acts = _normalize_activities(activities_block)
    acts = _diversify_for_group(acts, people)

    out = {
        "summary": "",
        "currency": "INR",
        "total_estimated_cost": 0,
        "days": [{"date": ds, "day_estimated_cost": 0, "items": []} for ds in days],
    }

    remaining_budget = budget
    used_names_global: set = set() if people >= 4 else set()

    # First pass – fill to caps
    for i, day in enumerate(out["days"]):
        cap = max(1, min(3, caps[i]))
        items: List[dict] = day["items"]

        for cand in acts:
            if len(items) >= cap:
                break
            if people >= 4 and cand["name"] in used_names_global:
                continue

            placed = _place_activity_with_slots(items, cand)
            if not placed:
                continue

            basis = cand.get("basis", "free")
            unit = cand.get("unit_price", 0.0)
            cost = (unit * people) if basis == "per_person" else (unit if basis == "per_group" else 0.0)
            if cost > remaining_budget:
                continue

            items.append(_mk_output_item(placed, people))
            remaining_budget -= cost
            if people >= 4:
                used_names_global.add(cand["name"])

        if len(items) == 0:
            items.append(_free_block())
        if cap == 1 and not any(x["type"] == "free_time" for x in items):
            items.append(_free_block())

    recompute_totals(out)

    # Second pass – aggressive budget utilization (fill-to-cap, then allow +1 over cap)
    if remaining_budget > 0:
        cheap_candidates = sorted(acts, key=lambda x: (x["unit_price"], -x["pop"]))
        for allow_overcap in (False, True):
            placed_any = True
            while placed_any and remaining_budget > 0:
                placed_any = False
                for i, day in enumerate(out["days"]):
                    cap = max(1, min(3, caps[i]))
                    hard_cap = cap if not allow_overcap else cap + 1
                    items = day["items"]
                    if len(items) >= hard_cap:
                        continue

                    for cand in cheap_candidates:
                        if any(it["type"] == "activity" and it["name"] == cand["name"] for it in items):
                            continue

                        placed = _place_activity_with_slots(items, cand)
                        if not placed:
                            continue

                        basis = cand.get("basis", "free")
                        unit = cand.get("unit_price", 0.0)
                        add_cost = (unit * people) if basis == "per_person" else (unit if basis == "per_group" else 0.0)
                        if add_cost > remaining_budget:
                            continue

                        items.append(_mk_output_item(placed, people))
                        remaining_budget -= add_cost
                        placed_any = True
                        break
                if not placed_any:
                    break

    recompute_totals(out)

    # Optional shape tweak – lighten last day if every day ended 3+
    if len(out["days"]) >= 2 and all(len(dy["items"]) >= 3 for dy in out["days"]):
        last = out["days"][-1]
        if len(last["items"]) > 2:
            idx = None
            cheapest = 10**9
            for i, itm in enumerate(last["items"]):
                if itm["type"] != "activity":
                    continue
                c = float(itm["cost_breakdown"]["subtotal"] or 0)
                if c > 0 and c < cheapest:
                    cheapest = c
                    idx = i
            if idx is not None:
                del last["items"][idx]
                recompute_totals(out)

    out["summary"] = summarize(out, people)
    return out

# ================== RESOLUTION HELPERS (match frontend payload) ==================
def _doc(i): return {"_id": str(i["_id"]), **{k: v for k, v in i.items() if k != "_id"}}

def _resolve_state_and_village(api_req: ApiItineraryRequest) -> Tuple[dict, dict]:
    """
    Accepts:
      - villageId directly, OR
      - village (name) [+ optional stateId] and resolves to a unique village
    Returns (state_doc, village_doc)
    """
    # Resolve state
    state_doc = None
    if api_req.stateId:
        try:
            state_doc = db.states.find_one({"_id": ObjectId(api_req.stateId)})
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid stateId")
        if not state_doc:
            raise HTTPException(status_code=404, detail="State not found")

    # Resolve village by id
    if api_req.villageId:
        try:
            vdoc = db.villages.find_one({"_id": ObjectId(api_req.villageId)})
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid villageId")
        if not vdoc:
            raise HTTPException(status_code=404, detail="Village not found")
        if state_doc and vdoc.get("state_id") != state_doc["_id"]:
            raise HTTPException(status_code=400, detail="Village not in provided state")
        # Backfill state if not supplied
        if not state_doc:
            state_doc = db.states.find_one({"_id": vdoc.get("state_id")})
        return state_doc, vdoc

    # Resolve village by name (what your frontend sends)
    if not api_req.village or not api_req.village.strip():
        raise HTTPException(status_code=422, detail="village (name) is required when villageId is not provided")

    name = api_req.village.strip()
    # case-insensitive exact match first
    q: Dict[str, Any] = {"village_name": re.compile(f"^{re.escape(name)}$", re.IGNORECASE)}
    if state_doc:
        q["state_id"] = state_doc["_id"]
    matches = list(db.villages.find(q).limit(5))

    # fallback: contains match if exact was empty
    if not matches:
        q2: Dict[str, Any] = {"village_name": re.compile(re.escape(name), re.IGNORECASE)}
        if state_doc:
            q2["state_id"] = state_doc["_id"]
        matches = list(db.villages.find(q2).limit(5))

    if not matches:
        raise HTTPException(status_code=404, detail="Village name not found")

    if len(matches) > 1:
        # Ambiguous when stateId not supplied
        if not state_doc:
            opts = [{"_id": str(v["_id"]), "name": v.get("village_name")} for v in matches]
            raise HTTPException(
                status_code=409,
                detail={"message": "Multiple villages matched. Provide stateId or villageId.",
                        "candidates": opts}
            )
        # With stateId, we’ll accept the first match
    vdoc = matches[0]
    if not state_doc:
        state_doc = db.states.find_one({"_id": vdoc.get("state_id")})
    return state_doc, vdoc

# ================== CORE PIPELINE ==================
def plan_itinerary_internal(state: dict, village: dict, payload: ItineraryRequest) -> dict:
    # dates
    start = to_date(payload.startDate)
    end = to_date(payload.endDate)
    if end < start:
        raise HTTPException(status_code=400, detail="endDate must be after startDate")

    # supply: ACTIVITIES ONLY
    activities = list(
        db.activities.find({"village_id": village["_id"]})
        .sort([("popularity_score", -1)]).limit(800)
    )
    activities_block = [{
        "_id": a["_id"],
        "name": a["name"],
        "start_time": a.get("start_time"),
        "end_time": a.get("end_time"),
        "price": as_money(a.get("price", 0)),
        "price_type": a.get("price_type", "free"),
        "popularity_score": as_money(a.get("popularity_score", 0)),
        "description": a.get("description", ""),
        "category": a.get("category"),
    } for a in activities]

    itinerary = plan_activities_only(
        people=payload.people,
        start=start,
        end=end,
        budget=payload.budgetTotalINR,
        activities_block=activities_block
    )

    return {
        "state": state.get("state_name"),
        "village": village.get("village_name"),
        "params": payload.model_dump(),
        "itinerary": itinerary
    }

# ================== APP & ROUTES ==================
app = FastAPI(title="Rural Planner (Activities Only, Aggressive Budget Utilization)")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=False, allow_methods=["*"], allow_headers=["*"],
)

# -------- sanity & logging (handy while integrating) --------
@app.on_event("startup")
async def _print_routes():
    print("=== ROUTES REGISTERED ===")
    for r in app.router.routes:
        try:
            methods = ",".join(sorted(r.methods)) if hasattr(r, "methods") else ""
            path = getattr(r, "path", "")
            name = getattr(r, "name", "")
            print(f"{methods:15} {path:30} {name}")
        except Exception:
            pass
    print("=========================")

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.middleware("http")
async def _log_requests(request: Request, call_next):
    print(f"[REQ] {request.method} {request.url.path}")
    resp = await call_next(request)
    print(f"[RES] {request.method} {request.url.path} -> {resp.status_code}")
    return resp

# -------- dropdown APIs used by your form --------
def _doc(i): return {"_id": str(i["_id"]), **{k: v for k, v in i.items() if k != "_id"}}

@app.get("/api/states")
def list_states():
    return [_doc(s) for s in db.states.find({}, {"state_name": 1}).sort("state_name", 1)]

@app.get("/api/villages/{state_id}")
def list_villages(state_id: str):
    try:
        sid = ObjectId(state_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid stateId")
    return [_doc(v) for v in db.villages.find({"state_id": sid}, {"village_name": 1}).sort("village_name", 1)]

# -------- simple HTML form (manual testing) --------
@app.get("/", response_class=RedirectResponse)
def index():
    return RedirectResponse(url="/plan", status_code=307)

@app.get("/plan", response_class=HTMLResponse)
def get_form():
    today = datetime.now().date().isoformat()
    later = (datetime.now().date() + timedelta(days=3)).isoformat()
    html = f"""
<!doctype html>
<html><body>
  <h2>Rural Planner – Activities Only</h2>
  <form method="post" action="/plan">
    <div>
      <label>State *</label>
      <select id="stateId" name="stateId" required></select>
    </div>
    <div>
      <label>Village *</label>
      <select id="villageId" name="villageId" required></select>
    </div>
    <div>
      <label>People *</label>
      <input type="number" name="people" value="2" min="1" required />
    </div>
    <div>
      <label>Budget (INR) *</label>
      <input type="number" name="budgetTotalINR" value="20000" min="0" step="100" required />
    </div>
    <div>
      <label>Start date *</label>
      <input type="date" name="startDate" value="{today}" required />
    </div>
    <div>
      <label>End date *</label>
      <input type="date" name="endDate" value="{later}" required />
    </div>
    <button type="submit">Build itinerary</button>
  </form>
  <script>
    async function loadStates() {{
      const res = await fetch('/api/states');
      const states = res.ok ? await res.json() : [];
      const el = document.getElementById('stateId');
      el.innerHTML = '<option value="">Select state</option>' +
        states.map(s => `<option value="${{s._id}}">${{s.state_name}}</option>`).join('');
      el.addEventListener('change', loadVillages);
    }}
    async function loadVillages() {{
      const sid = document.getElementById('stateId').value;
      if (!sid) {{
        document.getElementById('villageId').innerHTML = '<option value="">Select village</option>';
        return;
      }}
      const res = await fetch('/api/villages/' + sid);
      const villages = res.ok ? await res.json() : [];
      const el = document.getElementById('villageId');
      el.innerHTML = '<option value="">Select village</option>' +
        villages.map(v => `<option value="${{v._id}}">${{v.village_name}}</option>`).join('');
    }}
    loadStates();
  </script>
</body></html>
"""
    return HTMLResponse(content=html, status_code=200)

@app.post("/plan")
def post_form(
    stateId: str = Form(...),
    villageId: str = Form(...),
    people: int = Form(...),
    budgetTotalINR: float = Form(...),
    startDate: str = Form(...),
    endDate: str = Form(...),
):
    # Use the strict internal flow for the form
    payload = ItineraryRequest(
        stateId=stateId.strip(),
        villageId=villageId.strip(),
        people=people,
        budgetTotalINR=budgetTotalINR,
        startDate=startDate,
        endDate=endDate,
    )
    # Resolve docs
    state = db.states.find_one({"_id": ObjectId(payload.stateId)})
    village = db.villages.find_one({"_id": ObjectId(payload.villageId), "state_id": state["_id"]}) if state else None
    if not state or not village:
        raise HTTPException(status_code=404, detail="State/Village not found")
    result = plan_itinerary_internal(state, village, payload)
    return JSONResponse(content=result, status_code=200)

# -------- main API for your React frontend --------
# Accept both /api/itinerary and /api/itinerary/ and handle preflight
@app.api_route("/api/itinerary", methods=["POST", "OPTIONS"])
@app.api_route("/api/itinerary/", methods=["POST", "OPTIONS"])
def api_itinerary(payload: ApiItineraryRequest = Body(None)):
    # Preflight or empty body
    if payload is None:
        return JSONResponse(
            content={},
            headers={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
        )
    # Resolve state & village from flexible payload
    state_doc, village_doc = _resolve_state_and_village(payload)
    # Build strict internal request
    internal_req = ItineraryRequest(
        stateId=str(state_doc["_id"]),
        villageId=str(village_doc["_id"]),
        people=payload.people,
        budgetTotalINR=payload.budgetTotalINR,
        startDate=payload.startDate,
        endDate=payload.endDate,
    )
    result = plan_itinerary_internal(state_doc, village_doc, internal_req)
    return JSONResponse(content=result, status_code=200)

# Run
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
