"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

export const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered,
  onExploreClick
}) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    onClick={() => onExploreClick && onExploreClick(card.stateId)}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-200 ease-out cursor-pointer",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}>
    <img src={card.src} alt={card.title} className="object-cover absolute inset-0 w-full h-full" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end py-6 px-4">
      <div className={cn(
        "space-y-2 transition-all duration-200",
        hovered !== null && hovered !== index ? "blur-sm opacity-70" : "blur-0 opacity-100"
      )}>
        <h3 className="text-xl md:text-2xl font-pacifico font-semibold text-white">
          {card.title}
        </h3>
        <p className="text-sm text-white/90 font-mukta">
          {card.villagesCount} Villages • {card.culture}
        </p>
        <p className="text-xs text-white/80 font-source-serif leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

export function FocusCards({
  cards,
  onExploreClick
}) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onExploreClick={onExploreClick} />
      ))}
    </div>
  );
}
