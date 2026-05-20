// app/match/page.tsx
// Match detail page — assembles all components into a responsive layout
// Uses mock data only
"use client";
import mockMatchData from "@/lib/mock-match-data";
import MatchHeaderCard from "@/components/match-detail/MatchHeaderCard";
import PitchFormation from "@/components/match-detail/PitchFormation";
import StatsComparison from "@/components/match-detail/StatsComparison";
import AttackMomentumChart from "@/components/match-detail/AttackMomentumChart";
import MatchTimeline from "@/components/match-detail/MatchTimeline";
import PlayerTable from "@/components/match-detail/PlayerTable";
import Footer from "@/components/match-detail/Footer";

export default function MatchPage() {
  const data = mockMatchData;

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