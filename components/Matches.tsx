"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import type { Match } from "@/types/index";

function formatScore(homeScore: number | null, awayScore: number | null): string {
  if (homeScore !== null && awayScore !== null) {
    return `${homeScore}:${awayScore}`;
  }
  return "VS";
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/live");

        if (!response.ok) {
          throw new Error("Failed to fetch live matches");
        }

        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Live Matches
        </h2>
        <div className="flex gap-4 items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[320px] w-[320px] h-[200px] bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Live Matches
        </h2>
        <div className="min-w-[320px] w-[320px] h-[200px] flex items-center justify-center rounded-2xl border border-red-300 text-red-500 text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Live Matches
        </h2>
        <div className="min-w-[320px] w-[320px] h-[200px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          No matches found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 relative">
      <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
        Live Matches
      </h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 items-stretch ">
          {matches.map((match) => (
            <div
              key={match.id}
              className="min-w-[320px] w-[320px] bg-[var(--color-bg-card)] rounded shadow relative flex flex-col shrink-0"
            >
              {/* Top row: League + LIVE badge */}
              <div className="flex items-center justify-between px-5 pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#949494]">
                  {match.league}
                </span>
                <div className="flex items-center gap-2">
                  {match.liveTime && (
                    <span className="text-xs font-bold text-white bg-[#546B41] px-2.5 py-1 rounded-md">
                      {match.liveTime}
                    </span>
                  )}
                  <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#546B41] text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    LIVE
                  </span>
                </div>
              </div>

              {/* Teams and Score Middle */}
              <div className="flex justify-between items-center px-6 py-4 flex-1">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {match.homeTeamBadgeUrl ? (
                      <Image
                        src={match.homeTeamBadgeUrl}
                        alt={match.homeTeam ?? "Home"}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-500">
                        {(match.homeTeam ?? "?").charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                    {match.homeTeam ?? "?"}
                  </span>
                </div>

                {/* Score */}
                <span className="font-bold text-[30px] leading-none text-[var(--color-primary)]">
                  {formatScore(match.homeScore, match.awayScore)}
                </span>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {match.awayTeamBadgeUrl ? (
                      <Image
                        src={match.awayTeamBadgeUrl}
                        alt={match.awayTeam ?? "Away"}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-500">
                        {(match.awayTeam ?? "?").charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                    {match.awayTeam ?? "?"}
                  </span>
                </div>
              </div>

              {/* Match Details Link */}
              <Link
                href={`/match/${match.id}`}
                className="h-[36px] w-full text-[12px] flex items-center justify-center rounded-b border-t border-gray-100 text-[var(--color-primary)] bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                Match Details
              </Link>
            </div>
          ))}

          {/* Discover Card */}
          <div className="min-w-[320px] w-[320px] flex items-center justify-center border-2 border-dashed rounded-2xl text-gray-400 shrink-0">
            Discover
          </div>
        </div>
      </div>

      {/* Gradient Blur Right */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}