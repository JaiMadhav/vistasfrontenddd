import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }) => {
  const beamsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!beamsRef.current) return;
      const rect = beamsRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      beamsRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
      beamsRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={beamsRef}
      className={`absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-green-500/30 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
};
