"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Calendar, Shield, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Components
import HeroSlider from "@/components/HeroSlider";
import StatsCard from "@/components/StatsCard";
import Timeline from "@/components/Timeline";
import CommitteeCard from "@/components/CommitteeCard";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

// Data
import { committees } from "@/data/committees";
import { announcements } from "@/data/announcements";
import { timelineItems } from "@/data/timeline";
import { statsItems } from "@/data/stats";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all sections we want to fade up
    const sections = gsap.utils.toArray(".gsap-fade-section");
    
    sections.forEach((section: any) => {
      gsap.from(section, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Trigger when top of section hits 85% of viewport
          toggleActions: "play none none reverse",
        }
      });
    });
  }, { scope: container });

  // Feature only the first 3 committees on the home page
  const featuredCommittees = committees.slice(0, 3);

  return (
    <div ref={container} className="bg-transparent w-full min-h-screen">
      {/* Immersive Hero Slider */}
      <HeroSlider />

      {/* About Preview Section */}
      <section className="gsap-fade-section py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-foreground/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <SectionHeading
              tag="The IEMMUN Legacy"
              title="A Tradition of Academic & Diplomatic Rigor"
              description="IEMMUN 2026 brings together the next generation of global leaders, policymakers, and scholars. Our conference is established as a premiere platform for high-level simulation, intellectual challenge, and constructive compromise."
            />
            <p className="text-sm md:text-base text-foreground/60 font-sans leading-relaxed">
              For over half a decade, our summit has challenged delegates with complex crisis timelines, multi-lateral financial defaults, and sovereign security protocols. We emphasize academic research, precision speaking, and the complex art of international drafting.
            </p>
            <div className="mt-4 flex gap-4 font-sans">
              <Link href="/about">
                <Button variant="outline" className="group gap-2 border-foreground/20 hover:border-foreground hover:bg-foreground/5 transition-colors">
                  Read Conference Mission
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image/Teaser Card */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] border border-foreground/10 rounded-3xl overflow-hidden bg-foreground/5 p-2 shadow-2xl">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200"
                alt="Diplomatic Assembly"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase font-sans drop-shadow-md">
                  CONFERENCE VALUES
                </span>
                <h3 className="text-lg md:text-xl font-serif text-white font-medium drop-shadow-md">
                  Integrity, Diplomacy, and Intellect
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="gsap-fade-section py-16 bg-gradient-to-b from-foreground/5 to-transparent border-t border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsItems.map((stat, idx) => (
              <StatsCard
                key={idx}
                value={stat.value}
                label={stat.label}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Committees Section */}
      <section className="gsap-fade-section py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            tag="Featured Committees"
            title="Debate the Undebatable"
            description="Select from our diverse range of simulated assemblies, designed to test beginner, intermediate, and advanced diplomatic skill levels."
          />
          <Link href="/committees" className="shrink-0 font-sans">
            <Button variant="outline" className="group gap-2 border-foreground/20 hover:border-foreground">
              View All Committees
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCommittees.map((committee) => (
            <CommitteeCard
              key={committee.id}
              id={committee.id}
              name={committee.name}
              shortName={committee.shortName}
              agenda={committee.agenda}
              difficulty={committee.difficulty}
              image={committee.image}
            />
          ))}
        </div>
      </section>

      {/* Highlights & Timeline Grid */}
      <section className="gsap-fade-section py-20 md:py-28 bg-gradient-to-b from-foreground/5 to-transparent border-t border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Highlights List */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <SectionHeading
                tag="Why Participate"
                title="The IEMMUN Delegate Experience"
                description="Our summit provides delegates with a high-fidelity learning environment, simulating actual world governance challenges."
              />

              <div className="flex flex-col gap-6 mt-4">
                <div className="flex gap-4 group">
                  <div className="p-3 bg-foreground/5 border border-foreground/10 text-accent h-fit rounded-xl backdrop-blur-md group-hover:border-accent/50 group-hover:bg-accent/10 transition-colors duration-300">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1 font-sans">
                    <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground group-hover:text-accent transition-colors">Rigorous Crisis Writing</h4>
                    <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                      Custom historical and futurist crisis updates drafted by an expert staff that respond dynamically to delegate portfolios.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="p-3 bg-foreground/5 border border-foreground/10 text-accent h-fit rounded-xl backdrop-blur-md group-hover:border-accent/50 group-hover:bg-accent/10 transition-colors duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1 font-sans">
                    <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground group-hover:text-accent transition-colors">Distinguished Directors</h4>
                    <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                      Committees are overseen by seasoned MUN executives and policy students from Ivy-tier institutions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="p-3 bg-foreground/5 border border-foreground/10 text-accent h-fit rounded-xl backdrop-blur-md group-hover:border-accent/50 group-hover:bg-accent/10 transition-colors duration-300">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1 font-sans">
                    <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground group-hover:text-accent transition-colors">Comprehensive Study Portals</h4>
                    <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                      Receive extensive dossiers, country summaries, and rule guides ahead of committee sessions to facilitate preparation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Timeline Component */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <SectionHeading
                tag="Conference Timeline"
                title="Countdown to IEMMUN 2026"
                description="Plan your delegation timeline. Keep track of registration cycles and research deadlines."
              />
              <div className="mt-4">
                <Timeline items={timelineItems} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements Section */}
      <section className="gsap-fade-section py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <SectionHeading
            tag="Latest Announcements"
            title="News & Executive Releases"
            description="Stay informed with structural updates, guide releases, and notices from the Secretary-General."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-foreground/5 border border-foreground/10 p-6 md:p-8 flex flex-col justify-between gap-4 group hover:border-foreground/30 hover:bg-foreground/10 backdrop-blur-md rounded-3xl transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col gap-2 font-sans">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-accent">{announcement.category}</span>
                  <span className="text-foreground/50 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {announcement.date}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-medium text-foreground group-hover:text-accent transition-colors mt-2">
                  {announcement.title}
                </h3>
                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed mt-2 line-clamp-2">
                  {announcement.excerpt}
                </p>
              </div>
              <Link
                href="/resources"
                className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-foreground/60 hover:text-foreground transition-colors group/link mt-4"
              >
                Read Announcement
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-action Banner */}
      <CTABanner />
    </div>
  );
}
