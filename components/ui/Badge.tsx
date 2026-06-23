import React from "react";

interface BadgeProps {
  type: "Novice" | "Intermediate" | "Advanced";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = "" }) => {
  let badgeStyles = "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border backdrop-blur-xl font-sans transition-colors duration-300";

  switch (type) {
    case "Novice":
      badgeStyles += " bg-emerald-500/[0.05] text-emerald-400 border-emerald-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]";
      break;
    case "Intermediate":
      badgeStyles += " bg-amber-500/[0.05] text-amber-400 border-amber-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]";
      break;
    case "Advanced":
      badgeStyles += " bg-red-500/[0.05] text-red-400 border-red-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]";
      break;
  }

  return <span className={`${badgeStyles} ${className}`}>{type}</span>;
};

export default Badge;
