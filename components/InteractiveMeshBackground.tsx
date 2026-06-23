"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const InteractiveMeshBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full bg-[#030000] overflow-hidden"
    >
      {/* Apple Aurora Liquid Mesh Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-100">
        
        {/* Massive Ambient Slow-Moving Background Orbs */}
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -left-40 w-[1200px] h-[1200px] bg-[#3a0002] rounded-full filter blur-[200px] md:blur-[300px] opacity-60 mix-blend-screen origin-center"
        />

        <motion.div
          animate={{
            rotate: [360, 180, 0],
            scale: [1, 1.3, 1],
            x: [0, 200, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 -right-20 w-[1400px] h-[1400px] bg-[#2a0000] rounded-full filter blur-[200px] md:blur-[300px] opacity-70 mix-blend-screen origin-center"
        />

        {/* Core Red Orb following mouse smoothly (reduced opacity for subtle glass bleed) */}
        <motion.div
          animate={{
            x: mousePosition.x - 600,
            y: mousePosition.y - 600,
          }}
          transition={{ type: "spring", damping: 60, stiffness: 30, mass: 1 }}
          className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-[#9a0005] rounded-full filter blur-[250px] opacity-30 mix-blend-screen"
        />

      </div>

      {/* Noise Texture for cinematic grain - Apple aesthetic often uses extremely subtle noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay pointer-events-none" />

      {/* Edge Gradients / Vignette - Dark Only */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_120%)] pointer-events-none" />
    </div>
  );
};

export default InteractiveMeshBackground;
