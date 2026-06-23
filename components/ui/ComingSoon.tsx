"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { ArrowRight, Sparkles } from "lucide-react";

interface ComingSoonProps {
  title: string;
  subtitle: string;
  description: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title, subtitle, description }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center relative overflow-hidden py-20">
      
      {/* Floating Glass Pill Container */}
      <div className="max-w-xl flex flex-col items-center gap-6 relative z-10 bg-white/[0.015] backdrop-blur-[40px] border border-white/[0.05] p-12 md:p-16 rounded-[3rem] shadow-2xl">
        
        {/* Subtle top edge glare */}
        <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.05] bg-white/[0.03] text-2xs uppercase tracking-wider text-accent font-sans shadow-inner">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Announcing Shortly</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight leading-tight">
          {title}
        </h1>

        <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
          {description}
        </p>

        {submitted ? (
          <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-xl text-sm text-neutral-300 font-sans mt-4 w-full shadow-inner">
            Thank you. We will notify you as soon as updates are published.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4">
            <input
              type="email"
              placeholder="Enter your email for announcements"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 bg-black/40 border border-white/[0.08] rounded-full text-sm text-white focus:outline-none focus:border-accent/50 focus:bg-black/60 font-sans transition-all placeholder:text-neutral-500 shadow-inner"
            />
            <Button type="submit" variant="primary" className="gap-2 rounded-full px-6">
              Notify Me
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        <div className="mt-8 flex gap-4 font-sans text-xs">
          <Link href="/" className="text-neutral-400 hover:text-white transition-colors uppercase tracking-wider">
            Back to Homepage
          </Link>
          <span className="text-neutral-700">|</span>
          <Link href="/about" className="text-neutral-400 hover:text-white transition-colors uppercase tracking-wider">
            About the Conference
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
