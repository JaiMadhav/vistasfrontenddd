import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlipWords } from './flip-words';
import { TextGenerateEffect } from './text-generate-effect';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of images from the Images directory
  const images = [
    '/Images/1Rural.jpg',
    '/Images/2Rural.jpg',
    '/Images/3Rural.jpg',
    '/Images/4Rural.jpg',
    '/Images/5Rural.jpg',
    '/Images/6Rural.jpg',
    '/Images/7Rural.jpg',
    '/Images/8Rural.jpg',
    '/Images/9Rural.jpg',
    '/Images/10Rural.jpg',
    '/Images/11Rural.jpg'
  ];

  // Auto-slide images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Sliding Background Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut"
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-pacifico text-white mb-6"
          >
            Discover India's{' '}
            <FlipWords
              words={[
                "Hidden Villages",
                "Authentic Culture", 
                "Traditional Crafts",
                "Village Life",
                "Cultural Heritage",
                "Rural Experiences"
              ]}
              duration={3000}
              className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            />
          </motion.h1>

          <div className="mb-8 max-w-3xl mx-auto">
            <TextGenerateEffect
              words="Experience authentic culture, traditional handicrafts, and immersive village life across 5 states"
              className="text-xl md:text-2xl text-white/90 font-source-serif leading-relaxed"
              duration={0.5}
              filter={true}
            />
          </div>

        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
