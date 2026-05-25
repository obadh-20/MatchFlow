// components/top-transfers/TransferCard.tsx
// Individual transfer card showing player, clubs, fee, and details

import Image from "next/image";
import type { ApiRapidTopTransfer } from "@/types/api";

interface TransferCardProps {
  transfer: ApiRapidTopTransfer;
}

export default function TransferCard({ transfer }: TransferCardProps) {
  return (
    <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-sm border border-[#e6d8c0] p-5 flex flex-col gap-4">
      {/* Top row: Player photo + name + position */}
      <div className="flex items-center gap-4">
        {/* Player photo placeholder or img */}
        <div className="relative w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {transfer.photo ? (
            <Image
              src={transfer.photo}
              alt={transfer.player_name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-lg">
              {transfer.player_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-[#171A1F] truncate">
            {transfer.player_name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#546B41] bg-[var(--color-primary-light)] px-2 py-0.5 rounded-full">
              {transfer.position}
            </span>
            <span className="text-xs text-gray-500">{transfer.age} yrs</span>
          </div>
        </div>

        {/* Nationality badge */}
        {transfer.nationality && (
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {transfer.nationality}
          </span>
        )}
      </div>

      {/* Transfer details: From → To */}
      <div className="flex items-center gap-3">
        {/* From club */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
            {transfer.from_club?.logo ? (
              <Image
                src={transfer.from_club.logo}
                alt={transfer.from_club.name}
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
          <span className="text-xs font-medium text-gray-700 truncate">
            {transfer.from_club?.name ?? "Unknown"}
          </span>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 text-[var(--color-primary)]">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>

        {/* To club */}
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className="text-xs font-medium text-gray-700 truncate">
            {transfer.to_club?.name ?? "Unknown"}
          </span>
          <div className="relative w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
            {transfer.to_club?.logo ? (
              <Image
                src={transfer.to_club.logo}
                alt={transfer.to_club.name}
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
        </div>
      </div>

      {/* Bottom row: Fee + Market Value + League + Date */}
      <div className="flex items-center justify-between pt-2 border-t border-[#e6d8c0]">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Fee
            </span>
            <p className="text-sm font-bold text-[#171A1F]">
              {transfer.fee || "N/A"}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Market Value
            </span>
            <p className="text-sm font-semibold text-gray-600">
              {transfer.market_value || "N/A"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {transfer.league || ""}
          </span>
          <p className="text-xs text-gray-500">{transfer.date || ""}</p>
        </div>
      </div>
    </div>
  );
}