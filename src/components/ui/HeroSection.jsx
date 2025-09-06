import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeams } from './BackgroundBeams';
import { Sparkles } from './Sparkles';

const HeroSection = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Travel Website Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-200 rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-indigo-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-purple-200 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-blue-200 rounded-full"></div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Glass Container */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-3xl p-12 shadow-2xl">
          {title && (
            <motion.h1
              className="text-5xl md:text-7xl font-pacifico text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h1>
          )}
          
          {subtitle && (
            <motion.p
              className="text-xl md:text-2xl text-gray-600 font-montserrat mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
