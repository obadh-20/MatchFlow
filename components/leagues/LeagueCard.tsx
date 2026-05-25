// components/leagues/LeagueCard.tsx
// Individual league card showing league logo, name, country, and season

import Image from "next/image";
import Link from "next/link";
import type { ApiRapidLeague } from "@/types/api";

interface LeagueCardProps {
  league: ApiRapidLeague;
}

export default function LeagueCard({ league }: LeagueCardProps) {
  return (
    <Link href={`/league/${league.id}`} className="block">
      <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-sm border border-[#e6d8c0] p-5 flex flex-col gap-4 hover:shadow-md hover:border-[#546B41]/30 transition-all duration-200">
      {/* Top row: League logo + name + country */}
      <div className="flex items-center gap-4">
        {/* League logo */}
        <div className="relative w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
          {league.logo ? (
            <Image
              src={league.logo}
              alt={league.name}
              fill
              className="object-contain p-1"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-lg">
              {league.name
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
            {league.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            {/* Country flag */}
            {league.flag && (
              <Image
                src={league.flag}
                alt={league.country}
                width={16}
                height={12}
                className="rounded-sm object-cover"
                unoptimized
              />
            )}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#546B41] bg-[var(--color-primary-light)] px-2 py-0.5 rounded-full">
              {league.country}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row: Season */}
      <div className="flex items-center justify-between pt-3 border-t border-[#e6d8c0]">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Season
          </span>
          <p className="text-sm font-semibold text-[#171A1F]">
            {league.seasonName || league.season || "N/A"}
          </p>
        </div>

        {/* View details arrow */}
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)]">
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
    </Link>
  );
}