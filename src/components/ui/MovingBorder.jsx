import React from "react";
import { motion } from "framer-motion";

export const MovingBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative bg-black rounded-lg p-[2px]">{children}</div>
    </div>
  );
};
