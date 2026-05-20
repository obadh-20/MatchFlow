"use client";
import { useEffect, useState } from "react";

import type { Match } from "@/types/index";

type TrendingTeam = {
  rank: number;
  name: string;
  change: number;
};

type StandingTeam = {
  position: number;
  name: string;
  points: number;
};

const trendingTeams: TrendingTeam[] = [
  { rank: 1, name: "Liverpool", change: +1 },
  { rank: 2, name: "Real Madrid", change: 0 },
  { rank: 3, name: "Manchester City", change: -1 },
  { rank: 4, name: "Bayern Munich", change: +2 },
];

const standings: StandingTeam[] = [
  { position: 1, name: "Man City", points: 42 },
  { position: 2, name: "Arsenal", points: 40 },
  { position: 3, name: "Liverpool", points: 38 },
];

function getStatusBadge(status: string): { label: string; className: string } {
  switch (status) {
    case "live":
      return { label: "LIVE", className: "bg-red-500 text-white" };
    case "finished":
      return { label: "FINAL", className: "bg-gray-100 text-gray-700" };
    case "upcoming":
      return { label: "UPCOMING", className: "bg-blue-100 text-blue-700" };
    case "postponed":
      return { label: "POSTPONED", className: "bg-yellow-100 text-yellow-700" };
    default:
      return { label: "UPCOMING", className: "bg-gray-100 text-gray-700" };
  }
}

export default function MatchesCarousel() {
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/events");

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data: Match[] = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const finishedMatches = matches
    .filter((m) => m.status === "finished")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="w-full bg-[var(--color-bg-card)] md:h-full mt-3">
      {/* Carousel */}
     
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Main 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Left Column - Main Content */}
          <div className="flex flex-col gap-6">
            {/* Latest Match Results Section */}
            <section>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Latest Match Results
                </h2>
                <button className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  View All
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              {/* Matches Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-[189px] bg-gray-100 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="border border-red-300 rounded-xl p-6 text-center text-red-500 text-sm">
                  Error: {error}
                </div>
              ) : finishedMatches.length === 0 ? (
                <div className="border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
                  No finished matches available
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {finishedMatches.slice(0, 4).map((match) => {
                    const badge = getStatusBadge(match.status);
                    return (
                      <div
                        key={match.id}
                        className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col"
                        style={{ minHeight: "189px" }}
                      >
                        {/* Card Top Row */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {match.league}
                          </span>
                          <span
                            className={`px-2.5 py-1 text-xs font-bold rounded-md ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="flex items-center justify-between flex-1">
                          {/* Home Team */}
                          <div className="flex flex-col items-center gap-2 min-w-[80px]">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                              {match.homeTeamBadgeUrl ? (
                                <img
                                  src={match.homeTeamBadgeUrl}
                                  alt={match.homeTeam ?? "Home"}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-xs font-bold text-gray-500">
                                  {(match.homeTeam ?? "?").charAt(0)}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-800 text-center leading-tight">
                              {match.homeTeam ?? "?"}
                            </span>
                          </div>

                          {/* Score */}
                          <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold text-gray-900">
                              {match.homeScore ?? "?"} - {match.awayScore ?? "?"}
                            </span>
                          </div>

                          {/* Away Team */}
                          <div className="flex flex-col items-center gap-2 min-w-[80px]">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                              {match.awayTeamBadgeUrl ? (
                                <img
                                  src={match.awayTeamBadgeUrl}
                                  alt={match.awayTeam ?? "Away"}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-xs font-bold text-gray-500">
                                  {(match.awayTeam ?? "?").charAt(0)}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-800 text-center leading-tight">
                              {match.awayTeam ?? "?"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Newsletter Banner */}
            <div className="w-full bg-emerald-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Never miss a match again.
                </h3>
                <p className="text-emerald-200 text-sm">
                  Get real-time updates, match reminders, and exclusive content
                  delivered straight to your inbox.
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="px-5 py-2.5 bg-white text-emerald-800 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Trending Teams */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Trending Teams
              </h3>

              <div className="space-y-3">
                {trendingTeams.map((team) => (
                  <div
                    key={team.rank}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-bold text-gray-500 text-sm">
                        {team.rank}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://picsum.photos/seed/${team.name}/36/36`}
                          alt={team.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-800">
                        {team.name}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        team.change > 0
                          ? "text-emerald-600"
                          : team.change < 0
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {team.change > 0
                        ? `+${team.change}`
                        : team.change === 0
                        ? "—"
                        : team.change}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Full Database
              </button>
            </div>

            {/* Quick Standings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  Quick Standings
                </h3>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                  Full Table
                </button>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 block">
                Premier League
              </span>

              <div className="space-y-3">
                {standings.map((team) => (
                  <div
                    key={team.position}
                    className="flex items-center justify-between py-1.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-bold text-gray-500 text-sm">
                        {team.position}
                      </span>
                      <span className="font-medium text-gray-800">
                        {team.name}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {team.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}