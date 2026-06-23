"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import CommitteeCard from "@/components/CommitteeCard";
import { committees } from "@/data/committees";
import { Search, Filter } from "lucide-react";

type DifficultyFilter = "All" | "Novice" | "Intermediate" | "Advanced";

export default function CommitteesIndexPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommittees = committees.filter((committee) => {
    const matchesDifficulty =
      selectedDifficulty === "All" || committee.difficulty === selectedDifficulty;
    const matchesSearch =
      committee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      committee.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      committee.agenda.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDifficulty && matchesSearch;
  });

  const offlineCommittees = filteredCommittees.filter((c) => c.type === "Offline");
  const onlineCommittees = filteredCommittees.filter((c) => c.type === "Online");

  return (
    <div className="bg-transparent w-full min-h-screen pt-24 md:pt-32">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="max-w-3xl flex flex-col gap-6">
          <span className="text-2xs font-semibold tracking-[0.25em] text-accent uppercase font-sans">
            Our Chambers
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight leading-none">
            Committees & Agendas
          </h1>
          <p className="text-sm md:text-lg text-neutral-400 font-sans leading-relaxed">
            Discover the parliamentary councils, crisis rooms, and specialized panels simulated at IEMMUN 2026. Select a chamber to view portfolios and executive rosters.
          </p>
        </div>
      </section>

      {/* Interactive Filter Bar */}
      <section className="max-w-7xl mx-auto px-6 mb-12 font-sans relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-white/[0.08] bg-white/[0.02] backdrop-blur-[40px] rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or agenda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/[0.05] rounded-full text-xs text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.03] placeholder:text-white/40 transition-all shadow-inner backdrop-blur-md"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
            <span className="text-[10px] font-bold tracking-wider text-white/40 uppercase flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" />
              Difficulty:
            </span>
            {(["All", "Novice", "Intermediate", "Advanced"] as DifficultyFilter[]).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                  selectedDifficulty === diff
                    ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "bg-transparent border-transparent text-white/50 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Committees Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 flex flex-col gap-16">
        {filteredCommittees.length > 0 ? (
          <>
            {/* Offline Committees Section */}
            {offlineCommittees.length > 0 && (
              <div className="flex flex-col gap-8">
                <div className="border-b border-white/[0.08] pb-4">
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(195,13,15,0.5)]" />
                    Offline Committees
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {offlineCommittees.map((committee) => (
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
              </div>
            )}

            {/* Online Committees Section */}
            {onlineCommittees.length > 0 && (
              <div className="flex flex-col gap-8">
                <div className="border-b border-white/[0.08] pb-4">
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                    Online Committees
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {onlineCommittees.map((committee) => (
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
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 border border-white/[0.08] bg-white/[0.02] backdrop-blur-[40px] rounded-[2rem] max-w-3xl mx-auto w-full px-6 font-sans shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <span className="text-xs text-white/50 tracking-wider">No committees match your search filters. Please adjust the settings.</span>
          </div>
        )}
      </section>
    </div>
  );
}
