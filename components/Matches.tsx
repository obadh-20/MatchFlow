"use client";

import { useEffect, useState } from "react";
import type { Match } from "@/types/index";
import MatchResult from "./MatchResult";
export default function Matches() {
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
        <h2 className="text-white font-bold text-[34px] leading-[1.0] mb-8">
          Matches
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-[#2d2d2d] rounded-[20px] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-white font-bold text-[34px] leading-[1.0] mb-8">
          Matches
        </h2>
        <div className="border border-[#5200ff] rounded-[20px] p-6 text-center">
          <p className="text-[#949494] font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-white font-bold text-[34px] leading-[1.0] mb-8">
          Matches
        </h2>
        <div className="border border-white rounded-[20px] p-8 text-center">
          <p className="text-[#949494] font-medium">
            No matches found for today
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-white font-bold text-[34px] leading-[1.0] mb-8">
        Matches
      </h2>

  

        <div className="flex gap-4 items-center flex-col">
          {matches.map((match) => (
            <div key={match.id}>
              <MatchResult match={match} />
            </div>
          ))}
        </div>
      </div>
  );
}
