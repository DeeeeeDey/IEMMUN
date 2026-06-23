import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/Badge";
import { ArrowRight } from "lucide-react";

interface CommitteeCardProps {
  id: string;
  name: string;
  shortName: string;
  agenda: string;
  difficulty: "Novice" | "Intermediate" | "Advanced";
  image: string;
}

export const CommitteeCard: React.FC<CommitteeCardProps> = ({
  id,
  name,
  shortName,
  agenda,
  difficulty,
  image
}) => {
  return (
    <Link href={`/committees/${id}`} className="group relative flex flex-col w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px]">
      
      {/* Subtle top edge glare */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Section: Logo Container */}
      <div className="relative flex-1 w-full flex items-center justify-center p-6 mt-8 z-0">
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain mix-blend-multiply dark:mix-blend-screen"
          />
        </div>
      </div>
      
      {/* Glassmorphism Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent-hover/0 group-hover:from-accent/5 group-hover:to-accent-hover/5 transition-colors duration-500 pointer-events-none" />
      <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 group-hover:ring-foreground/20 transition-all duration-500 rounded-[2rem] pointer-events-none z-20" />

      {/* Badge */}
      <div className="absolute top-6 right-6 z-20">
        <Badge type={difficulty} />
      </div>

      {/* Bottom Section: Details Section with dark gradient fade up to cover the bottom of the logo */}
      <div className="relative z-20 bg-gradient-to-t from-background via-background to-transparent pt-12 pb-8 px-8 flex flex-col gap-4 mt-auto">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase font-sans drop-shadow-md">
            {shortName}
          </span>
          <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground group-hover:text-accent transition-colors drop-shadow-lg line-clamp-2">
            {name}
          </h3>
        </div>
        
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-[10px] font-bold tracking-wider text-foreground/50 uppercase font-sans">
            Agenda Focus
          </span>
          <p className="text-xs text-foreground/70 font-sans leading-relaxed line-clamp-2">
            {agenda}
          </p>
        </div>

        <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-foreground mt-2 w-fit">
          Explore Committee Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CommitteeCard;
