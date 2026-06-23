"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const CTABanner: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (marqueeRef.current) {
      gsap.to(".marquee-content", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
      
      {/* GSAP Infinite Marquee Background */}
      <div ref={marqueeRef} className="absolute inset-0 flex items-center whitespace-nowrap opacity-[0.03] pointer-events-none overflow-hidden select-none z-0 mix-blend-screen">
        <div className="marquee-content flex gap-8">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-[8rem] md:text-[12rem] font-serif font-medium text-white uppercase tracking-tighter">
              DIPLOMACY • LEADERSHIP • DEBATE • GLOBAL IMPACT • 
            </span>
          ))}
        </div>
      </div>

      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 flex justify-center">
        <div className="border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] p-10 md:p-16 flex flex-col items-center text-center gap-8 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden">
          
          {/* Subtle top edge glare */}
          <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="flex flex-col items-center gap-4 relative z-10">
            <span className="text-2xs font-semibold tracking-[0.25em] text-accent uppercase font-sans drop-shadow-md">
              Apply Now
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white font-medium tracking-tight leading-tight">
              Shape the Future of Diplomatic Dialogue
            </h2>
            <p className="text-sm md:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl">
              Institutional registrations and individual delegate applications are open. Secure your place at the most prestigious simulation of the year.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0 font-sans mt-2">
            <Link href="/committees" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full gap-2 px-8 py-6 rounded-full text-xs uppercase tracking-widest font-bold">
                Register Delegation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-white/20 hover:border-white hover:bg-white/5 px-8 py-6 rounded-full text-xs uppercase tracking-widest font-bold">
                Contact Secretariat
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
