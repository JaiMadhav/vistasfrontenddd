"use client";

import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);
  
  useEffect(() => {
    // Wait for images to load before starting animation
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    const checkImagesLoaded = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        addAnimation();
      }
    };
    
    if (images.length === 0) {
      // No images, start immediately
      addAnimation();
    } else {
      images.forEach(img => {
        if (img.complete) {
          checkImagesLoaded();
        } else {
          img.addEventListener('load', checkImagesLoaded);
          img.addEventListener('error', checkImagesLoaded);
        }
      });
    }
    
    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      addAnimation();
    }, 1000);
    
    return () => {
      clearTimeout(fallbackTimer);
      images.forEach(img => {
        img.removeEventListener('load', checkImagesLoaded);
        img.removeEventListener('error', checkImagesLoaded);
      });
    };
  }, []);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      
      // Ensure first image is visible before starting animation
      setTimeout(() => {
        setStart(true);
      }, 200);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "slow") {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_0%,white_100%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start ? "animate-scroll" : "opacity-100",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ visibility: start ? 'visible' : 'visible' }}>
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-gray-200 bg-white overflow-hidden md:w-[450px] shadow-lg hover:shadow-xl transition-all duration-300"
            key={item.name}>
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={`${item.name} state image`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            <blockquote className="px-8 py-6">
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>
              <span
                className="relative z-20 text-sm leading-[1.6] font-normal text-gray-800 font-source-serif">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span
                    className="text-sm leading-[1.6] font-normal text-gray-600 font-pacifico">
                    {item.name}
                  </span>
                  <span
                    className="text-sm leading-[1.6] font-normal text-gray-500 font-mukta">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
