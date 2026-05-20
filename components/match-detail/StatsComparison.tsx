// components/match-detail/StatsComparison.tsx
// Container for stat bars with team labels

import type { MatchStat } from "@/types/match-detail";
import SectionCard from "./SectionCard";
import StatBar from "./StatBar";

interface StatsComparisonProps {
  stats: MatchStat[];
  homeTeam: string;
  awayTeam: string;
}

export default function StatsComparison({ stats, homeTeam, awayTeam }: StatsComparisonProps) {
  return (
    <SectionCard title="Match Stats">
      {/* Team labels */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
          {homeTeam}
        </span>
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">vs</span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {awayTeam}
        </span>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-3">
        {stats.map((stat) => (
          <StatBar key={stat.label} stat={stat} />
        ))}
      </div>
    </SectionCard>
  );
}