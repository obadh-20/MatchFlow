// app/match/page.tsx
// Match detail page — assembles all components into a responsive layout
// Fetches data from the API route
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { MatchDetailData } from "@/types/match-detail";
import MatchHeaderCard from "@/components/match-detail/MatchHeaderCard";
import PitchFormation from "@/components/match-detail/PitchFormation";
import StatsComparison from "@/components/match-detail/StatsComparison";
import MatchTimeline from "@/components/match-detail/MatchTimeline";
import PlayerTable from "@/components/match-detail/PlayerTable";
import Footer from "@/components/match-detail/Footer";

// Lazy-load the recharts component (heavy library ~500KB)
const AttackMomentumChart = dynamic(
  () => import("@/components/match-detail/AttackMomentumChart"),
  { ssr: false }
);

export default function MatchPage() {
  const [data, setData] = useState<MatchDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/match");

        if (!response.ok) {
          throw new Error("Failed to fetch match details");
        }

        const result = await response.json();
        setData(result.response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-gray-100 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
            <div className="h-80 bg-gray-100 rounded-2xl" />
            <div className="h-80 bg-gray-100 rounded-2xl" />
            <div className="h-80 bg-gray-100 rounded-2xl" />
          </div>
          <div className="h-64 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="min-h-[400px] flex items-center justify-center rounded-2xl border border-red-300 text-red-500 text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="min-h-[400px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          No match data found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Hero section */}
      <section className="mb-6 md:mb-8">
        <MatchHeaderCard data={data.header} />
      </section>

      {/* 3-column grid layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-6 md:mb-8">
        {/* Left: Pitch Formation */}
        <div className="lg:col-span-1">
          <PitchFormation
            homeFormation={data.homeFormation}
            awayFormation={data.awayFormation}
          />
        </div>

        {/* Center: Stats + Momentum */}
        <div className="lg:col-span-1 flex flex-col gap-5 md:gap-6">
          <StatsComparison
            stats={data.stats}
            homeTeam={data.header.homeTeam}
            awayTeam={data.header.awayTeam}
          />
          <AttackMomentumChart data={data.momentum} />
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-1">
          <MatchTimeline events={data.timeline} />
        </div>
      </section>

      {/* Bottom: Player Table */}
      <section className="mb-6 md:mb-8">
        <PlayerTable players={data.players} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}