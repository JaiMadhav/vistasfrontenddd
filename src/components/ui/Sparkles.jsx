import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Sparkles = ({ 
  background = "transparent", 
  minSize = 0.4, 
  maxSize = 1, 
  speed = 1, 
  particleCount = 30,
  className = "" 
}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [particleCount, minSize, maxSize]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: particle.duration * speed,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
