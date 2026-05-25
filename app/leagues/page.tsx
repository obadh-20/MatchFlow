// app/leagues/page.tsx
// Top Leagues page — displays popular football leagues fetched from the RapidAPI endpoint

"use client";

import { useEffect, useState } from "react";
import type { ApiRapidLeague } from "@/types/api";
import LeagueCard from "@/components/leagues/LeagueCard";

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<ApiRapidLeague[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/top-leagues");

        if (!response.ok) {
          throw new Error("Failed to fetch top leagues");
        }

        const data = await response.json();

        // The API returns { status, response: { leagues: [...] } }
        const leagueList = Array.isArray(data?.response?.leagues)
          ? data.response.leagues
          : Array.isArray(data?.leagues)
            ? data.leagues
            : [];

        setLeagues(leagueList);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Top Leagues
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-[180px] bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Top Leagues
        </h2>
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-red-300 text-red-500 text-sm">
          {error}
        </div>
      </div>
    );
  }

  // Empty state
  if (leagues.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Top Leagues
        </h2>
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          No leagues found
        </div>
      </div>
    );
  }

  // Data state
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-2">
        Top Leagues
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Popular football leagues from around the world
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>
    </div>
  );
}