"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { ArrowRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: string;
  category: string;
  title: string;
  btnText: string;
  btnLink: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: "01",
    category: "DISEC SUMMIT",
    title: "The Militarization of Orbit and Space Security",
    btnText: "Explore DISEC Space Agenda",
    btnLink: "/committees/disec",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "02",
    category: "WBLA LEGISLATIVE",
    title: "Socio-Economic Reforms and State Resource Management",
    btnText: "Review Legislative Agenda",
    btnLink: "/committees/wbla",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "03",
    category: "WTO ONLINE SUMMIT",
    title: "Reforming Digital Commerce and Global Disputes",
    btnText: "Access WTO Trade Portal",
    btnLink: "/committees/wto",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
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
      const formattedIndia = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
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
    <section className="relative w-full h-[95vh] md:h-[100vh] flex flex-col justify-between overflow-hidden">
      
      {/* Apple Liquid Glass Background Setup */}
      {/* 
        The global orbs (from InteractiveMeshBackground) are beneath this component.
        The image itself will be fully visible with a soft overlay to ensure text readability.
      */}
      <div className="absolute inset-0 -z-10 bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Soft vignette gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
      </div>

      {/* Main Content (Vertically aligned) */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-32 md:pt-40 z-10 flex-grow flex items-center pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start gap-4 md:gap-6"
            >
              {/* Category Apple Style Pill */}
              <div className="px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md">
                <span className="text-2xs md:text-[10px] font-semibold tracking-[0.25em] text-accent uppercase font-sans">
                  {slides[currentIndex].category}
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-foreground tracking-tight leading-[1.08] max-w-2xl drop-shadow-2xl">
                {slides[currentIndex].title}
              </h1>

              {/* Call to action */}
              <div className="mt-2 md:mt-4">
                <Link href={slides[currentIndex].btnLink}>
                  <Button variant="outline" className="group gap-2 border-foreground/20 bg-foreground/5 backdrop-blur-xl hover:bg-foreground hover:text-background hover:border-foreground px-8 py-4 transition-all duration-500 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                    {slides[currentIndex].btnText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Bottom Control Pill - Apple Glass Aesthetic */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
        <div className="w-full max-w-6xl rounded-[2rem] border border-foreground/[0.08] bg-foreground/[0.02] backdrop-blur-[40px] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.4)] overflow-hidden pointer-events-auto">
          {/* Subtle top edge glass sheen glow */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent pointer-events-none z-20" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch h-full">
            {/* Previews (Cols 1-9) */}
            <div className="md:col-span-9 grid grid-cols-3 border-r border-foreground/[0.08]">
              {slides.map((slide, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => selectSlide(index)}
                    className={`text-left p-3 md:p-5 transition-all duration-700 flex flex-col justify-center relative cursor-pointer group border-r border-foreground/[0.05] last:border-r-0 ${
                      isActive 
                        ? "bg-foreground/[0.06]" 
                        : "bg-transparent hover:bg-foreground/[0.03]"
                    }`}
                  >
                    {/* Sleek Progress Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent">
                      {isActive && (
                        <div
                          className="h-full bg-accent transition-all duration-100 ease-linear shadow-[0_0_12px_rgba(195,13,15,0.5)]"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-1 md:gap-1.5 px-2">
                      <span className={`text-[9px] md:text-[10px] font-semibold font-sans tracking-[0.2em] transition-colors duration-500 uppercase ${
                        isActive ? "text-accent" : "text-foreground/40 group-hover:text-foreground/60"
                      }`}>
                        {slide.id}
                      </span>
                      <span className={`text-[10px] md:text-[12px] font-sans font-medium line-clamp-1 transition-colors duration-500 ${
                        isActive ? "text-foreground" : "text-foreground/50 group-hover:text-foreground/70"
                      }`}>
                        {slide.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clock Widget (Cols 10-12) */}
            <div className="md:col-span-3 p-3 md:p-5 flex items-center justify-center md:justify-between gap-4 font-sans bg-transparent px-6">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Clock className="w-3 h-3 text-accent" />
                  <span className="text-[8px] tracking-[0.2em] text-foreground/40 font-bold uppercase">India</span>
                </div>
                <span className="text-xs md:text-sm font-mono text-foreground tracking-widest">{indiaTime || "00:00"}</span>
              </div>
              
              <div className="w-[1px] h-8 bg-foreground/10 mx-2 hidden md:block" />

              <div className="flex flex-col gap-0.5 items-end hidden md:flex">
                <span className="text-[8px] tracking-[0.2em] text-foreground/40 font-bold uppercase mb-0.5">Local</span>
                <span className="text-xs md:text-sm font-mono text-foreground/60 tracking-widest">{localTime || "00:00"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
