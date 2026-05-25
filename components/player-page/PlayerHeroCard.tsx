// components/player-page/PlayerHeroCard.tsx
// Hero profile card — large dark green card with avatar, name, stats summary

import { Button } from "@/components/ui/button";
import { UserPlus, Share2 } from "lucide-react";
import type { PlayerProfile, StatSummary } from "@/lib/player-types";

interface PlayerHeroCardProps {
  profile: PlayerProfile;
  statSummary: StatSummary;
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
      {initials}
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-2.5 text-center min-w-[80px] flex-1">
      <p className="text-lg md:text-xl font-bold text-white">{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70 mt-0.5">
        {label}
      </p>
    </div>
  );
}

export default function PlayerHeroCard({ profile, statSummary }: PlayerHeroCardProps) {
  return (
    <div className="rounded-2xl bg-[var(--color-primary)] p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Left: Avatar + Name + Action buttons */}
        <div className="flex items-center gap-5 flex-1 flex-wrap">
          <AvatarPlaceholder name={profile.name} />
          <div className="flex-1 min-w-[180px]">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {profile.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                {profile.position}
              </span>
              <span className="text-sm text-white/80">{profile.teamName}</span>
              <span className="text-xs text-white/50">•</span>
              <span className="text-sm text-white/80">{profile.leagueName}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button
                size="sm"
                className="bg-white text-[var(--color-primary)] hover:bg-white/90 font-semibold text-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Follow
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Stat summary pills */}
        <div className="flex gap-3 w-full md:w-auto flex-wrap">
          <StatPill label="Appearances" value={statSummary.appearances} />
          <StatPill label="Goals" value={statSummary.goals} />
          <StatPill label="Assists" value={statSummary.assists} />
        </div>
      </div>
    </div>
  );
}