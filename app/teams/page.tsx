// app/teams/page.tsx
// Teams page placeholder

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Team } from "@/types/index";

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      setTeams([]);

      const response = await fetch(`/api/teams?t=${encodeURIComponent(searchTerm)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }

      const data = await response.json();
      setTeams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-2">
        Teams
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Search for football teams
      </p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <label htmlFor="team-search" className="sr-only">Search for a team</label>
        <input
          id="team-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a team (e.g. Arsenal, Chelsea)"
          className="flex-1 max-w-md px-4 py-2.5 rounded-lg border border-[#e6d8c0] bg-[#FFF8EC] text-[14px] text-[#546B41] placeholder:text-[#9a8f7a] focus:outline-none focus:ring-2 focus:ring-[#546B41]/20 focus:border-[#546B41]"
        />
        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="px-5 py-2.5 bg-[#546B41] text-white font-semibold rounded-lg hover:bg-[#546B41]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[120px] bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-red-300 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Empty state */}
      {searched && !loading && !error && teams.length === 0 && (
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          No teams found for &ldquo;{searchTerm}&rdquo;
        </div>
      )}

      {/* Teams Grid */}
      {!loading && !error && teams.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-[var(--color-bg-card)] rounded-2xl shadow-sm border border-[#e6d8c0] p-5 flex items-center gap-4"
            >
              <div className="relative w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                {team.badgeUrl ? (
                  <Image
                    src={team.badgeUrl}
                    alt={team.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-lg">
                    {team.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-[#171A1F] truncate">
                  {team.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {team.leagueName || team.location || "No league info"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Initial state */}
      {!searched && !loading && (
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          Enter a team name to search
        </div>
      )}
    </div>
  );
}