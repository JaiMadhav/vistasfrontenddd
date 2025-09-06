import React, { useState } from "react";
import { motion } from "framer-motion";

export const CardHoverEffect = ({ children, className = "" }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouseX(event.clientX - rect.left);
    setMouseY(event.clientY - rect.top);
  };

  return (
    <motion.div
      className={`relative group/card rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
