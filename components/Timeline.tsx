import React from "react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  active?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative border-l border-white/10 ml-4 md:ml-6 flex flex-col gap-10 py-4 font-sans">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 md:pl-12 group">
          {/* Timeline marker node */}
          <span className={`absolute left-0 -translate-x-[5px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            item.active 
              ? "bg-accent scale-125 ring-4 ring-red-950/40" 
              : "bg-white/20 group-hover:bg-accent group-hover:scale-110"
          }`} />

          <div className="flex flex-col gap-1.5 max-w-3xl">
            <span className={`text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase ${
              item.active ? "text-accent" : "text-white/50 group-hover:text-white/70"
            }`}>
              {item.date}
            </span>
            <h3 className="text-base md:text-lg font-serif font-medium text-white group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
