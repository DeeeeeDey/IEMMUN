import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { committees } from "@/data/committees";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Download, FileText, Globe, Users, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static routes for the committees
export async function generateStaticParams() {
  return committees.map((c) => ({
    id: c.id,
  }));
}

export default async function CommitteeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const committee = committees.find((c) => c.id === id);

  if (!committee) {
    notFound();
  }

  return (
    <div className="bg-transparent w-full min-h-screen">
      {/* Immersive Visual Header */}
      <section className="relative w-full min-h-[40vh] flex items-end bg-gradient-to-b from-neutral-950 via-neutral-900 to-black border-b border-neutral-900 pt-32 pb-12">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col items-start gap-4">
            {/* Back button */}
            <Link
              href="/committees"
              className="inline-flex items-center gap-2 text-2xs uppercase tracking-wider text-neutral-450 hover:text-white transition-colors mb-2 font-sans"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Chambers
            </Link>

            <div className="flex items-center gap-3">
              <Badge type={committee.difficulty} />
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase font-sans bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.08] backdrop-blur-md">
                {committee.difficulty} Level
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-tight max-w-4xl">
              {committee.name}
            </h1>
          </div>

          {/* Large Logo Emblem Container */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 bg-white/[0.015] p-4 border border-white/[0.08] rounded-[2rem] backdrop-blur-[40px] shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="relative w-full h-full">
              <Image
                src={committee.image}
                alt={committee.name}
                fill
                priority
                sizes="(max-width: 768px) 112px, 128px"
                className="object-contain p-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Details (Cols 1-8) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Overview */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-serif text-white font-medium border-b border-neutral-900 pb-3">
                Chamber Overview
              </h2>
              <p className="text-sm md:text-base text-neutral-350 leading-relaxed font-sans">
                {committee.overview}
              </p>
            </div>

            {/* Agenda Focus */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-serif text-white font-medium border-b border-neutral-900 pb-3">
                Agenda Focus & Context
              </h2>
              <p className="text-sm md:text-base text-neutral-350 leading-relaxed font-sans">
                {committee.detailedAgenda}
              </p>
            </div>

            {/* Portfolio Matrix */}
            <div className="flex flex-col gap-4 font-sans">
              <h2 className="text-xl md:text-2xl font-serif text-white font-medium border-b border-neutral-900 pb-3">
                Portfolio Allocation Matrix
              </h2>
              <p className="text-xs md:text-sm text-neutral-500 mb-2">
                The portfolios listed below are active for IEMMUN 2026. Country allocations will occur upon registration validation.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <a 
                    href={committee.backgroundGuideUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.15] backdrop-blur-xl rounded-[1.5rem] transition-all flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-white/70 shadow-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <FileText className="w-4 h-4 text-accent" />
                    Background Guide
                  </a>
                {committee.portfolioMatrix.map((portfolio, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 transition-colors flex items-center gap-2 text-xs text-neutral-300"
                  >
                    <Globe className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                    <span className="truncate">{portfolio}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sidebar (Cols 9-12) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-8">
            
            {/* Executive Board */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2rem] shadow-xl relative overflow-hidden transition-all duration-500 hover:border-white/[0.15]">
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <h2 className="text-xl md:text-2xl font-serif text-white font-medium mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(195,13,15,0.5)]" />
                Executive Board
              </h2>
              <div className="flex flex-col gap-4 mt-4 font-sans">
                {committee.executiveBoard.map((member, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-sm font-medium text-white">{member.name}</span>
                    <span className="text-2xs text-accent uppercase tracking-wider mt-0.5">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Study Guide & Resources */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2rem] shadow-xl relative overflow-hidden transition-all duration-500 hover:border-white/[0.15]">
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <h2 className="text-xl md:text-2xl font-serif text-white font-medium mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neutral-500 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                Dossier & Study Guides
              </h2>
              
              <div className="flex flex-col gap-4 mt-6">
                {/* Background Guide CTA */}
                <div className="flex flex-col gap-3 p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl shadow-inner font-sans">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-white">Background Study Guide</span>
                      <span className="text-[10px] text-white/50">PDF Document</span>
                    </div>
                  </div>
                  <a href={committee.backgroundGuideUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer rounded-full bg-white/[0.03] text-white border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] active:scale-[0.98] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] px-4 py-2 text-[10px] w-full gap-2 mt-2">
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </a>
                </div>

                {/* Additional resources link */}
                <div className="flex flex-col gap-3 font-sans mt-2">
                  <span className="text-2xs font-bold tracking-wider text-neutral-500 uppercase">
                    Additional Reference Material
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {committee.resources.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-neutral-400 hover:text-accent transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {res.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
