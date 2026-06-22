"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { ArrowRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: string;
  category: string;
  title: string;
  image: string;
  btnText: string;
  btnLink: string;
}

const slides: Slide[] = [
  {
    id: "01",
    category: "DISEC SUMMIT",
    title: "The Militarization of Orbit and Space Security",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop",
    btnText: "Explore DISEC Space Agenda",
    btnLink: "/committees/disec"
  },
  {
    id: "02",
    category: "WBLA LEGISLATIVE",
    title: "Socio-Economic Reforms and State Resource Management",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1600&auto=format&fit=crop",
    btnText: "Review Legislative Agenda",
    btnLink: "/committees/wbla"
  },
  {
    id: "03",
    category: "WTO ONLINE SUMMIT",
    title: "Reforming Digital Commerce and Global Disputes",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    btnText: "Access WTO Trade Portal",
    btnLink: "/committees/wto"
  }
];

const AUTOPLAY_TIME = 8000; // 8 seconds

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indiaTime, setIndiaTime] = useState("");
  const [localTime, setLocalTime] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const [progress, setProgress] = useState(0);

  // Auto-play timer logic
  useEffect(() => {
    resetTimer();
    return () => clearIntervals();
  }, [currentIndex]);

  const clearIntervals = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    clearIntervals();
    startTimeRef.current = Date.now();
    setProgress(0);

    // Update progress bar
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const calculatedProgress = Math.min((elapsed / AUTOPLAY_TIME) * 100, 100);
      setProgress(calculatedProgress);

      if (elapsed >= AUTOPLAY_TIME) {
        handleNext();
      }
    }, 100);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Clock Widget logic
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();

      // India Time (IST)
      const formattedIndia = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      // Delegate Local Time
      const formattedLocal = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      setIndiaTime(formattedIndia);
      setLocalTime(formattedLocal);
    };

    updateClocks();
    const clockInterval = setInterval(updateClocks, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  return (
    <section className="relative w-full h-[95vh] md:h-[100vh] bg-transparent overflow-hidden flex flex-col justify-between">
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />
        </AnimatePresence>
        {/* Editorial Gradients (Vercel-like bottom overlay and top/left content protection) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Main Content (Vertically aligned) */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-32 md:pt-40 z-10 flex-grow flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start gap-4 md:gap-6"
            >
              {/* Category */}
              <span className="text-2xs md:text-xs font-semibold tracking-[0.25em] text-accent uppercase font-sans">
                {slides[currentIndex].category}
              </span>
              
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white tracking-tight leading-[1.08] max-w-2xl">
                {slides[currentIndex].title}
              </h1>

              {/* Call to action */}
              <div className="mt-2 md:mt-4">
                <Link href={slides[currentIndex].btnLink}>
                  <Button variant="outline" className="group gap-2 border-neutral-700 hover:border-white px-6 py-3">
                    {slides[currentIndex].btnText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Horizontal Previews & Clock Strip */}
      <div className="w-full z-10 border-t border-neutral-900 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Previews (Cols 1-9) */}
          <div className="md:col-span-9 grid grid-cols-3 border-r border-neutral-900">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => selectSlide(index)}
                  className={`text-left p-4 md:p-6 transition-all duration-300 flex flex-col justify-between relative cursor-pointer group ${
                    isActive ? "bg-neutral-900/50" : "hover:bg-neutral-950"
                  }`}
                >
                  {/* Progress timer bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-neutral-800">
                      <div
                        className="h-full bg-accent transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <span className={`text-[10px] md:text-xs font-semibold font-sans tracking-widest ${
                      isActive ? "text-accent" : "text-neutral-500 group-hover:text-neutral-400"
                    }`}>
                      {slide.id}
                    </span>
                    <span className={`text-[11px] md:text-sm font-sans font-medium line-clamp-1 transition-colors ${
                      isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                    }`}>
                      {slide.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Clock Widget (Cols 10-12) */}
          <div className="md:col-span-3 p-4 md:p-6 flex items-center justify-between gap-4 font-sans bg-black/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wider text-neutral-500 font-bold uppercase">India (IST)</span>
                <span className="text-xs md:text-sm font-mono text-white tracking-widest">{indiaTime || "00:00:00"}</span>
              </div>
            </div>
            <div className="flex flex-col items-end border-l border-neutral-900 pl-4">
              <span className="text-[10px] tracking-wider text-neutral-500 font-bold uppercase">Your Time</span>
              <span className="text-xs md:text-sm font-mono text-neutral-400 tracking-widest">{localTime || "00:00:00"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
