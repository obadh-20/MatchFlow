"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { ApiRapidMatchDetail } from "@/types/api";

function formatDateTime(utcDate: string): string {
  const d = new Date(utcDate);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function MatchDetails() {
  const params = useParams();
  const id = params.id as string;

  const [detail, setDetail] = useState<ApiRapidMatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/match/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Match not found");
          }
          throw new Error("Failed to fetch match details");
        }

        const data = await response.json();
        setDetail(data);
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

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-12 bg-gray-200 rounded w-2/3" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-red-200 bg-red-50 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!detail) {
    return null;
  }

  const statusText = detail.finished
    ? "Finished"
    : detail.started
      ? "Live"
      : "Upcoming";

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
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
        Back
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {detail.leagueName}
            </p>
            {detail.leagueRoundName && (
              <p className="text-xs text-gray-400 mt-0.5">
                Round {detail.leagueRoundName}
              </p>
            )}
          </div>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-md ${
              detail.finished
                ? "bg-gray-100 text-gray-600"
                : detail.started
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
            }`}
          >
            {statusText}
          </span>
        </div>

        {/* Teams */}
        <div className="px-6 py-8 flex items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-700">
                {detail.homeTeam.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900 text-center">
              {detail.homeTeam.name}
            </span>
          </div>

          {/* Score / VS */}
          <div className="flex flex-col items-center gap-1 px-6">
            <span className="text-3xl font-bold text-gray-900">
              VS
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-700">
                {detail.awayTeam.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900 text-center">
              {detail.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Match Info */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">
                Date & Time
              </span>
              <p className="text-gray-900 font-medium mt-1">
                {formatDateTime(detail.matchTimeUTCDate)}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">
                Match Round
              </span>
              <p className="text-gray-900 font-medium mt-1">
                {detail.matchRound}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">
                Country
              </span>
              <p className="text-gray-900 font-medium mt-1">
                {detail.countryCode}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">
                Coverage
              </span>
              <p className="text-gray-900 font-medium mt-1">
                {detail.coverageLevel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatchDetailsPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-3xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-12 bg-gray-200 rounded w-2/3" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    }>
      <MatchDetails />
    </Suspense>
  );
}