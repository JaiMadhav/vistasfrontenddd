"use client";;
import { FiChevronRight } from "react-icons/fi";
import { useState, useRef, useId, useEffect } from "react";
import { DirectionAwareHover } from "./direction-aware-hover";

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick,
  totalSlides,
  onExploreClick
}) => {
  const slideRef = useRef(null);
  const { src, button, title, stateId } = slide;
  
  // Calculate position relative to current center
  const centerIndex = current; // Use current state as center
  const distanceFromCenter = Math.abs(index - centerIndex);
  const isCenter = index === centerIndex;
  const isLeft = index < centerIndex;
  const isRight = index > centerIndex;

  // Calculate scale and opacity based on distance from center
  const getScale = () => {
    if (isCenter) return 1;
    if (distanceFromCenter === 1) return 0.7;
    if (distanceFromCenter === 2) return 0.5;
    return 0.3;
  };

  const getOpacity = () => {
    if (isCenter) return 1;
    if (distanceFromCenter === 1) return 0.7;
    if (distanceFromCenter === 2) return 0.5;
    return 0.3;
  };

  const getZIndex = () => {
    if (isCenter) return 20;
    if (distanceFromCenter === 1) return 15;
    if (distanceFromCenter === 2) return 10;
    return 5;
  };


  const handleExploreClick = (e) => {
    e.stopPropagation();
    if (onExploreClick && stateId) {
      onExploreClick(stateId);
    }
  };

  // Calculate circular position
  const angle = (index - current) * (360 / totalSlides);
  const radius = isCenter ? 0 : 140; // Distance from center (reduced for closer spacing)
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div className="absolute">
      <li
        ref={slideRef}
        className="transition-all duration-500 ease-in-out cursor-pointer"
        onClick={() => handleSlideClick(index)}
        style={{
          transform: `translate(${x}px, ${y}px) scale(${getScale()})`,
          opacity: getOpacity(),
          zIndex: getZIndex(),
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
        
        <DirectionAwareHover
          imageUrl={src}
          className={`${isCenter ? 'ring-4 ring-blue-500 ring-opacity-50 shadow-2xl' : 'shadow-lg'} rounded-2xl`}
          imageClassName="rounded-2xl"
        >
          <div className="space-y-4">
            <h2 className={`font-pacifico font-semibold ${
              isCenter ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            }`}>
              {title}
            </h2>
            
            {isCenter && (
              <button
                className="px-6 py-3 bg-white text-gray-800 font-montserrat font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={handleExploreClick}>
                {button}
              </button>
            )}
          </div>
        </DirectionAwareHover>
      </li>
    </div>
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick
}) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}>
      <FiChevronRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

export default function Carousel({
  slides,
  onExploreClick
}) {
  const [current, setCurrent] = useState(Math.floor(slides.length / 2)); // Start with middle slide
  const carouselRef = useRef(null);


  const handleSlideClick = (index) => {
    setCurrent(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const previous = current - 1;
        const newIndex = previous < 0 ? slides.length - 1 : previous;
        setCurrent(newIndex);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        const next = current + 1;
        const newIndex = next === slides.length ? 0 : next;
        setCurrent(newIndex);
      }
    };

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [current, slides.length]); // Include slides.length in dependencies

  const id = useId();

  return (
    <div
      ref={carouselRef}
      className="relative w-full max-w-6xl mx-auto zoom-responsive carousel-container"
      aria-labelledby={`carousel-heading-${id}`}
      tabIndex={0} // Make it focusable for keyboard navigation
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const previous = current - 1;
          setCurrent(previous < 0 ? slides.length - 1 : previous);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = current + 1;
          setCurrent(next === slides.length ? 0 : next);
        }
      }}>
      
      {/* Circular Display - Show all slides */}
      <div className="relative w-full h-[500px] flex items-center justify-center py-8">
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            totalSlides={slides.length}
            onExploreClick={onExploreClick}
          />
        ))}
      </div>
      

      {/* Navigation Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <CarouselControl
          type="previous"
          title="Go to previous slide (or press ←)"
          handleClick={() => {
            const previous = current - 1;
            const newIndex = previous < 0 ? slides.length - 1 : previous;
            setCurrent(newIndex);
          }} />

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === current 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <CarouselControl 
          type="next" 
          title="Go to next slide (or press →)" 
          handleClick={() => {
            const next = current + 1;
            const newIndex = next === slides.length ? 0 : next;
            setCurrent(newIndex);
          }} 
        />
      </div>
    </div>
  );
}
