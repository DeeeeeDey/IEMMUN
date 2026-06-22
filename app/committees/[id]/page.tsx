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
              <span className="text-2xs font-bold tracking-widest text-neutral-400 uppercase font-sans bg-neutral-900/60 px-2 py-0.5 border border-neutral-800">
                {committee.shortName}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-tight max-w-4xl">
              {committee.name}
            </h1>
          </div>

          {/* Large Logo Emblem Container */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 bg-neutral-950/40 p-4 border border-white/[0.06] rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-center">
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
            <div className="p-6 border border-neutral-900 bg-neutral-950/40 rounded-lg">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-sans border-b border-neutral-900 pb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Executive Board
              </h3>
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
            <div className="p-6 border border-neutral-900 bg-neutral-950/40 rounded-lg">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-sans border-b border-neutral-900 pb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                Dossier & Study Guides
              </h3>
              
              <div className="flex flex-col gap-4 mt-6">
                {/* Background Guide CTA */}
                <div className="flex flex-col gap-3 p-4 bg-black border border-neutral-900 rounded font-sans">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-white">Background Study Guide</span>
                      <span className="text-[10px] text-neutral-500">PDF Document</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2 border-neutral-800 text-neutral-400 hover:text-white mt-2">
                    <Download className="w-3.5 h-3.5" />
                    Download PDF (Placeholder)
                  </Button>
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
