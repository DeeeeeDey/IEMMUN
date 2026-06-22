import React from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/Timeline";
import CTABanner from "@/components/CTABanner";
import { Shield, Award, Compass, Target } from "lucide-react";

const evolutionTimeline = [
  {
    date: "1945",
    title: "Global Diplomacy Born",
    description: "United Nations Established. Foundation of modern international diplomatic framework.",
    active: false
  },
  {
    date: "1952",
    title: "Educational Innovation",
    description: "First Model UN Conference. Academic simulation of diplomatic processes begins.",
    active: false
  },
  {
    date: "1990s",
    title: "International Growth",
    description: "Worldwide Expansion. MUN conferences establish global presence.",
    active: false
  },
  {
    date: "2012",
    title: "IEMMUN Established",
    description: "IEMMUN Founded. International Excellence in Model United Nations begins its journey.",
    active: false
  },
  {
    date: "2026",
    title: "13th Annual Conference",
    description: "IEMMUN 13th Edition. Continuing excellence in diplomatic education and international relations.",
    active: true
  }
];

export default function AboutPage() {
  return (
    <div className="bg-transparent w-full min-h-screen pt-24 md:pt-32">
      {/* Editorial Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
        <div className="max-w-3xl flex flex-col gap-6">
          <span className="text-2xs font-semibold tracking-[0.25em] text-accent uppercase font-sans">
            About IEMMUN
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight leading-none">
            Advancing diplomatic education through innovative simulation and academic excellence
          </h1>
        </div>
      </section>

      {/* Grid: Image and Narrative (Mission) */}
      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-28 border-t border-neutral-900 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-3 bg-neutral-900 border border-neutral-850 text-accent w-fit rounded">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-white font-medium">
              Our Mission
            </h2>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed">
              IEMMUN 2026 represents the convergence of academic rigor and diplomatic excellence. We create immersive educational experiences that challenge participants to engage with complex global issues, develop critical thinking capabilities, and cultivate the leadership skills essential for addressing contemporary international challenges.
            </p>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed">
              Our commitment extends beyond simulation to fostering genuine understanding of multilateral diplomacy and international relations.
            </p>
          </div>

          <div className="lg:col-span-6 relative w-full aspect-[16/9] border border-neutral-900 bg-neutral-950/40 p-1">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200"
                alt="Diplomacy Session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives & Conference Values */}
      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-28 border-t border-neutral-900 pt-16">
        <div className="text-center mb-12">
          <SectionHeading
            tag="Key Competencies"
            title="Conference Core Pillars"
            description="Our academic metrics prioritize research, rhetoric, and cooperative drafting."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-6 border border-neutral-900 bg-neutral-950/40 flex flex-col gap-3 font-sans">
            <Award className="w-5 h-5 text-accent" />
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mt-2">Academic Excellence</h4>
            <p className="text-xs text-neutral-550 leading-relaxed">
              Maintaining the highest standards in diplomatic education through rigorous research, comprehensive preparation, and expert guidance.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 border border-neutral-900 bg-neutral-950/40 flex flex-col gap-3 font-sans">
            <Compass className="w-5 h-5 text-accent" />
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mt-2">Global Perspective</h4>
            <p className="text-xs text-neutral-550 leading-relaxed">
              Fostering international understanding through diverse representation and comprehensive exploration of global challenges and solutions.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 border border-neutral-900 bg-neutral-950/40 flex flex-col gap-3 font-sans">
            <Shield className="w-5 h-5 text-accent" />
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mt-2">Leadership Development</h4>
            <p className="text-xs text-neutral-550 leading-relaxed">
              Cultivating the next generation of diplomatic leaders through practical experience in negotiation, consensus-building, and strategic thinking.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Timeline & Milestones */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-neutral-900 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              tag="Evolution"
              title="Evolution of Diplomatic Education"
              description="From the founding foundations of modern international relations to the 13th edition of IEMMUN in 2026."
            />
          </div>
          <div className="lg:col-span-7">
            <Timeline items={evolutionTimeline} />
          </div>
        </div>
      </section>

      {/* Call-to-action */}
      <CTABanner />
    </div>
  );
}
