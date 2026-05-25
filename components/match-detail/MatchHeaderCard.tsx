// components/match-detail/MatchHeaderCard.tsx
// Hero match summary card with league, teams, score, and metadata

import Image from "next/image";
import type { MatchHeaderData } from "@/types/match-detail";

interface MatchHeaderCardProps {
  data: MatchHeaderData;
}

function StatusPill({ status, liveTime }: { status: MatchHeaderData["status"]; liveTime?: string }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-primary)] text-white text-xs font-bold">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        {liveTime ? `${liveTime} • LIVE` : "LIVE"}
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">
        FULL TIME
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-xs font-bold">
      UPCOMING
    </span>
  );
}

function TeamBadge({ name, badgeUrl, side }: { name: string; badgeUrl: string; side: "home" | "away" }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${side === "home" ? "md:items-end" : "md:items-start"} items-center flex-1`}>
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
        {badgeUrl ? (
          <Image src={badgeUrl} alt={name} fill className="object-cover" unoptimized />
        ) : (
          <span className="text-lg md:text-2xl font-bold text-gray-500">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <span className="text-sm md:text-base font-semibold text-gray-900 text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

export default function MatchHeaderCard({ data }: MatchHeaderCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm bg-[var(--color-bg-card)] overflow-hidden">
      {/* Top bar: League + Status */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {data.leagueBadgeUrl && (
            <Image src={data.leagueBadgeUrl} alt="" width={20} height={20} className="object-contain" unoptimized />
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {data.leagueName}
          </span>
        </div>
        <StatusPill status={data.status} liveTime={data.liveTime} />
      </div>

      {/* Teams + Score */}
      <div className="px-5 py-6 md:py-8 flex items-center justify-between">
        <TeamBadge name={data.homeTeam} badgeUrl={data.homeTeamBadgeUrl} side="home" />

        <div className="flex flex-col items-center gap-1 px-4 md:px-8">
          <span className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight">
            {data.homeScore} - {data.awayScore}
          </span>
        </div>

        <TeamBadge name={data.awayTeam} badgeUrl={data.awayTeamBadgeUrl} side="away" />
      </div>

      {/* Metadata */}
      <div className="px-5 py-4 bg-[var(--color-primary-light)] border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Stadium</span>
            <p className="text-gray-800 font-medium mt-0.5 text-xs md:text-sm">{data.stadium}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Attendance</span>
            <p className="text-gray-800 font-medium mt-0.5 text-xs md:text-sm">{data.attendance}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Referee</span>
            <p className="text-gray-800 font-medium mt-0.5 text-xs md:text-sm">{data.referee}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">VAR</span>
            <p className="text-gray-800 font-medium mt-0.5 text-xs md:text-sm">{data.var}</p>
          </div>
        </div>
      </div>
    </div>
  );
}