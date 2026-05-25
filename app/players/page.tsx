// app/players/page.tsx
// Players page — displays top transfers from the RapidAPI endpoint

"use client";

import TopTransfersPage from "@/components/top-transfers/TopTransfersPage";

export default function PlayersPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      <TopTransfersPage />
    </div>
  );
}