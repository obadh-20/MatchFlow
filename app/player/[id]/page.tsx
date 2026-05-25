// app/player/[id]/page.tsx
// Player Profile page — assembles all components into a responsive layout
// Fetches data from the API route

"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import type { PlayerPageData } from "@/lib/player-types";
import PlayerHeroCard from "@/components/player-page/PlayerHeroCard";
import PlayerInfoCard from "@/components/player-page/PlayerInfoCard";
import AttributesCard from "@/components/player-page/AttributesCard";
import CareerBreakdownTable from "@/components/player-page/CareerBreakdownTable";
import AwardsListCard from "@/components/player-page/AwardsListCard";
import SimilarPlayersGrid from "@/components/player-page/SimilarPlayersGrid";

// Lazy-load the recharts component (heavy library ~500KB)
const PerformanceTrendChart = dynamic(
  () => import("@/components/player-page/PerformanceTrendChart"),
  { ssr: false }
);

function PlayerContent() {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState<PlayerPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlayer = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/player/${id}`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to fetch player details");
        }

        const result = await response.json();
        if (!controller.signal.aborted) {
          setData(result.response);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchPlayer();
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-gray-100 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 md:gap-6">
            <div className="space-y-6">
              <div className="h-64 bg-gray-100 rounded-2xl" />
              <div className="h-48 bg-gray-100 rounded-2xl" />
            </div>
            <div className="space-y-6">
              <div className="h-40 bg-gray-100 rounded-2xl" />
              <div className="h-48 bg-gray-100 rounded-2xl" />
              <div className="h-32 bg-gray-100 rounded-2xl" />
            </div>
          </div>
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
          No player data found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Hero Section */}
      <section className="mb-6 md:mb-8">
        <PlayerHeroCard profile={data.profile} statSummary={data.statSummary} />
      </section>

      {/* Grid: Main Content (65%) + Sidebar (35%) */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 md:gap-6 mb-6 md:mb-8">
        {/* Main Content Column */}
        <div className="flex flex-col gap-5 md:gap-6">
          <PerformanceTrendChart data={data.ratingTrend} />
          <CareerBreakdownTable career={data.career} />
        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-5 md:gap-6">
          <PlayerInfoCard profile={data.profile} />
          <AttributesCard attributes={data.attributes} />
          <AwardsListCard awards={data.awards} />
        </div>
      </section>

      {/* Similar Players — full width below the grid */}
      <section>
        <SimilarPlayersGrid players={data.similarPlayers} />
      </section>
    </div>
  );
}

export default function PlayerPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-12 bg-gray-200 rounded w-2/3" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    }>
      <PlayerContent />
    </Suspense>
  );
}