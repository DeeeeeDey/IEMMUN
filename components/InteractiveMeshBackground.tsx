"use client";

import React, { useEffect, useRef } from "react";

export const InteractiveMeshBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full bg-black overflow-hidden"
    >
      {/* Subtle repeating grid mesh */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Moving red highlight glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
            rgba(195, 13, 15, 0.15),
            transparent 80%
          )`,
        }}
      />

      {/* Radial overlay to dim the edges slightly for vignette look */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
};

export default InteractiveMeshBackground;
