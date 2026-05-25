// components/top-transfers/TopTransfersPage.tsx
// Client component that fetches top transfers and renders the grid of cards

"use client";

import { useEffect, useState } from "react";
import type { ApiRapidTopTransfer } from "@/types/api";
import TransferCard from "./TransferCard";

export default function TopTransfersPage() {
  const [transfers, setTransfers] = useState<ApiRapidTopTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/top-transfers");

        if (!response.ok) {
          throw new Error("Failed to fetch top transfers");
        }

        const data = await response.json();

        // The API returns { status, response: { transfers: [...] } }
        const transferList =
          data?.response?.transfers ??
          data?.transfers ??
          [];

        setTransfers(transferList);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Top Transfers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[220px] bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Top Transfers
        </h2>
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-red-300 text-red-500 text-sm">
          {error}
        </div>
      </div>
    );
  }

  // Empty state
  if (transfers.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Top Transfers
        </h2>
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          No transfers found
        </div>
      </div>
    );
  }

  // Data state
  return (
    <div className="w-full">
      <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-2">
        Top Transfers
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        The biggest moves in football
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {transfers.map((transfer) => (
          <TransferCard key={transfer.id} transfer={transfer} />
        ))}
      </div>
    </div>
  );
}