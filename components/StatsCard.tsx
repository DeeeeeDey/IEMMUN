import React from "react";

interface StatsCardProps {
  value: string;
  label: string;
  description: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, label, description }) => {
  return (
    <div className="bg-white/[0.015] border border-white/[0.08] backdrop-blur-[40px] rounded-[2rem] p-8 md:p-10 flex flex-col gap-3 group shadow-xl relative overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.03]">
      {/* Subtle top edge glare */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <span className="text-4xl md:text-5xl font-sans font-bold text-white group-hover:text-accent transition-colors drop-shadow-md tracking-tighter">
        {value}
      </span>
      <h4 className="text-xs font-bold tracking-[0.25em] text-white/50 uppercase font-sans mt-2">
        {label}
      </h4>
      <p className="text-xs md:text-sm text-white/60 font-sans leading-relaxed mt-1">
        {description}
      </p>
    </div>
  );
};

export default StatsCard;
