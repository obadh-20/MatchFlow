// components/match-detail/StatBar.tsx
// Individual split progress bar for a match stat

import type { MatchStat } from "@/types/match-detail";

interface StatBarProps {
  stat: MatchStat;
}

export default function StatBar({ stat }: StatBarProps) {
  // Calculate percentages for the bar split view
  const total = stat.home + stat.away;
  const homePercent = total > 0 ? (stat.home / total) * 100 : 50;
  const awayPercent = total > 0 ? (stat.away / total) * 100 : 50;

  const displayHome = typeof stat.home === "number" && stat.home % 1 !== 0 ? stat.home.toFixed(1) : stat.home;
  const displayAway = typeof stat.away === "number" && stat.away % 1 !== 0 ? stat.away.toFixed(1) : stat.away;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">{stat.label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-[var(--color-primary)] w-8 text-right">
          {displayHome}
        </span>
        {/* Progress bar track */}
        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="flex h-full w-full">
            <div
              className="h-full rounded-l-full transition-all duration-500"
              style={{
                width: `${homePercent}%`,
                backgroundColor: "var(--color-primary)",
              }}
            />
            <div
              className="h-full rounded-r-full transition-all duration-500"
              style={{
                width: `${awayPercent}%`,
                backgroundColor: "var(--color-primary)",
                opacity: 0.3,
              }}
            />
          </div>
        </div>
        <span className="text-xs font-semibold text-gray-500 w-8">
          {displayAway}
        </span>
      </div>
    </div>
  );
}