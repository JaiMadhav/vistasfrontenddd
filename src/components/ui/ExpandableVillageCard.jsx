import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { MapPin, X } from "lucide-react";

const ExpandableVillageCard = ({ villages }) => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4 text-black" />
            </motion.button>
            
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.image}
                  alt={active.name}
                  className="w-full h-80 lg:h-80 rounded-tr-lg rounded-tl-lg object-cover"
                  onError={(e) => {
                    e.target.src = '/Images/landscape-bg.jpg'
                  }}
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-6">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="text-2xl font-pacifico font-bold text-gray-800 mb-2"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.div
                      layoutId={`location-${active.name}-${id}`}
                      className="flex items-center text-gray-600 mb-2"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-mukta">{active.district}, {active.state}</span>
                    </motion.div>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-gray-600 font-source-serif"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                </div>
                
                <div className="pt-4 relative px-6">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto font-source-serif"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-mukta font-semibold text-gray-800 mb-2">About {active.name}</h4>
                        <p>
                          {active.name} is a beautiful village located in {active.district}, {active.state}. 
                          This charming destination offers visitors an authentic glimpse into rural Indian life, 
                          showcasing traditional culture, local crafts, and warm hospitality.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-mukta font-semibold text-gray-800 mb-2">What to Experience</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Traditional village life and customs</li>
                          <li>Local handicrafts and artisanal work</li>
                          <li>Authentic regional cuisine</li>
                          <li>Cultural performances and festivals</li>
                          <li>Scenic natural surroundings</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-mukta font-semibold text-gray-800 mb-2">Best Time to Visit</h4>
                        <p>
                          The ideal time to visit {active.name} is during the cooler months from October to March, 
                          when the weather is pleasant and perfect for exploring the village and its surroundings.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-6 pt-0">
                  <motion.button
                    layoutId={`button-${active.name}-${id}`}
                    className="w-full px-6 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                    onClick={() => setActive(null)}
                  >
                    Explore Village
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <div className="max-w-4xl mx-auto w-full gap-4 space-y-4">
        {villages.map((village, index) => (
          <motion.div
            layoutId={`card-${village.name}-${id}`}
            key={`card-${village.name}-${id}`}
            onClick={() => setActive(village)}
            className="p-6 flex flex-col md:flex-row justify-between items-center hover:bg-gray-50 rounded-xl cursor-pointer border border-gray-200 hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex gap-6 flex-col md:flex-row">
              <motion.div layoutId={`image-${village.name}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={village.image}
                  alt={village.name}
                  className="h-40 w-40 md:h-20 md:w-20 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = '/Images/landscape-bg.jpg'
                  }}
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${village.name}-${id}`}
                  className="text-xl font-pacifico font-semibold text-gray-800 mb-2 text-center md:text-left"
                >
                  {village.name}
                </motion.h3>
                <motion.div
                  layoutId={`location-${village.name}-${id}`}
                  className="flex items-center text-gray-600 mb-2 justify-center md:justify-start"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="font-mukta">{village.district}, {village.state}</span>
                </motion.div>
                <motion.p
                  layoutId={`description-${village.description}-${id}`}
                  className="text-gray-600 font-source-serif text-center md:text-left"
                >
                  {village.description}
                </motion.p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
              <motion.button
                layoutId={`button-${village.name}-${id}`}
                className="px-6 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white text-gray-800 transition-all duration-200"
              >
                Explore
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ExpandableVillageCard;
