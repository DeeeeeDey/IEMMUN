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
      <section className="max-w-7xl mx-auto px-6 mb-12 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-neutral-900 bg-neutral-950/40 rounded-lg">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by name or agenda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black border border-neutral-800 text-xs text-white focus:outline-none focus:border-accent placeholder:text-neutral-600 transition-colors"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" />
              Difficulty:
            </span>
            {(["All", "Novice", "Intermediate", "Advanced"] as DifficultyFilter[]).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 text-3xs font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-accent border-accent text-white"
                    : "bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
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
                <div className="border-b border-neutral-900 pb-4">
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
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
                <div className="border-b border-neutral-900 pb-4">
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
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
          <div className="text-center py-20 border border-neutral-900 bg-neutral-950/20 max-w-7xl mx-auto px-6 font-sans">
            <span className="text-xs text-neutral-500">No committees match your search filters. Please adjust the settings.</span>
          </div>
        )}
      </section>
    </div>
  );
}
