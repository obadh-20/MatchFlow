// app/league/[id]/page.tsx
// League Detail page — displays standings, top scorers, and league info

"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ApiRapidLeagueDetail, ApiRapidLeagueDetailTeam, ApiRapidLeagueDetailTopScorer } from "@/types/api";

function LeagueDetailContent() {
  const params = useParams();
  const id = params?.id;
  const [detail, setDetail] = useState<ApiRapidLeagueDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/league/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("League not found");
          }
          throw new Error("Failed to fetch league details");
        }

        const data = await response.json();

        // Extract detail from { status, response: { detail: ... } }
        const leagueDetail = data?.response?.detail ?? data?.detail ?? null;
        setDetail(leagueDetail);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-48 bg-gray-100 rounded-2xl" />
          <div className="h-64 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-red-200 bg-red-50 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <Link
            href="/leagues"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Back to Leagues
          </Link>
        </div>
      </div>
    );
  }

  // Empty state
  if (!detail) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="min-h-[400px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          No league data found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Back navigation */}
      <Link
        href="/leagues"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10 12L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Leagues
      </Link>

      {/* League Header */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-sm border border-[#e6d8c0] p-6 mb-6 md:mb-8">
        <div className="flex items-center gap-5">
          {/* League Logo */}
          <div className="relative w-20 h-20 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
            {detail.logo ? (
              <Image
                src={detail.logo}
                alt={detail.name}
                fill
                className="object-contain p-2"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xl">
                {detail.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#171A1F]">
              {detail.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              {detail.flag && (
                <Image
                  src={detail.flag}
                  alt={detail.country}
                  width={20}
                  height={16}
                  className="rounded-sm object-cover"
                  unoptimized
                />
              )}
              <span className="text-sm text-gray-500">{detail.country}</span>
              <span className="text-gray-300 mx-1">•</span>
              <span className="text-sm text-gray-500">
                Season {detail.seasonName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Standings Table */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-sm border border-[#e6d8c0] overflow-hidden mb-6 md:mb-8">
        <div className="px-6 py-4 border-b border-[#e6d8c0]">
          <h2 className="text-lg font-bold text-[#171A1F]">Standings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e6d8c0] bg-[var(--color-primary-light)]">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-10">
                  #
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Team
                </th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  P
                </th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  W
                </th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  D
                </th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  L
                </th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  GF
                </th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  GA
                </th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  GD
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.teams.map((team: ApiRapidLeagueDetailTeam) => (
                <tr
                  key={team.id}
                  className="border-b border-[#e6d8c0] last:border-b-0 hover:bg-[var(--color-primary-light)] transition-colors"
                >
                  <td className="px-4 py-3 font-bold text-[#546B41]">
                    {team.position}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-7 h-7 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                        {team.logo ? (
                          <Image
                            src={team.logo}
                            alt={team.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                            ?
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-[#171A1F]">
                        {team.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {team.played}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {team.won}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {team.drawn}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {team.lost}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {team.goalsFor}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {team.goalsAgainst}
                  </td>
                  <td className="px-3 py-3 text-center font-semibold">
                    <span
                      className={
                        team.goalDifference > 0
                          ? "text-green-600"
                          : team.goalDifference < 0
                            ? "text-red-600"
                            : "text-gray-600"
                      }
                    >
                      {team.goalDifference > 0 ? "+" : ""}
                      {team.goalDifference}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-[#171A1F]">
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Scorers */}
      {detail.topScorers && detail.topScorers.length > 0 && (
        <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-sm border border-[#e6d8c0] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e6d8c0]">
            <h2 className="text-lg font-bold text-[#171A1F]">Top Scorers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e6d8c0] bg-[var(--color-primary-light)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 w-10">
                    #
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Player
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Team
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Goals
                  </th>
                </tr>
              </thead>
              <tbody>
                {detail.topScorers.map(
                  (scorer: ApiRapidLeagueDetailTopScorer, index: number) => (
                    <tr
                      key={scorer.id}
                      className="border-b border-[#e6d8c0] last:border-b-0 hover:bg-[var(--color-primary-light)] transition-colors"
                    >
                      <td className="px-4 py-3 font-bold text-[#546B41]">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            {scorer.photo ? (
                              <Image
                                src={scorer.photo}
                                alt={scorer.playerName}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs">
                                {scorer.playerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-[#171A1F]">
                              {scorer.playerName}
                            </span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-xs text-gray-400">
                                {scorer.nationality}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {scorer.teamLogo && (
                            <div className="relative w-5 h-5 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                              <Image
                                src={scorer.teamLogo}
                                alt={scorer.teamName}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          )}
                          <span className="text-sm text-gray-600">
                            {scorer.teamName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm">
                          {scorer.goals}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeagueDetailPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-12 bg-gray-200 rounded w-2/3" />
          <div className="h-48 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    }>
      <LeagueDetailContent />
    </Suspense>
  );
}