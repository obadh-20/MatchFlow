// components/match-detail/PitchFormation.tsx
// Mini football pitch with absolute-positioned player dots

import type { FormationData } from "@/types/match-detail";
import SectionCard from "./SectionCard";
import PlayerMarker from "./PlayerMarker";

interface PitchFormationProps {
  homeFormation: FormationData;
  awayFormation: FormationData;
}

function FormationSide({ data, label }: { data: FormationData; label: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
        <span className="text-[10px] font-medium text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-0.5 rounded">
          {data.formation}
        </span>
      </div>

      {/* Pitch */}
      <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-[#4a7c3f] to-[#3d6b34] rounded-lg overflow-hidden border-2 border-[#2d5a25]">
        {/* Pitch markings */}
        <div className="absolute inset-0 border border-white/20" />
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20" />
        {/* Center line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20" />
        {/* Penalty areas */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-1/5 border border-white/20 border-t-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-1/5 border border-white/20 border-b-0" />
        {/* Goal areas */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/12 border border-white/20 border-t-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/12 border border-white/20 border-b-0" />

        {/* Player markers */}
        {data.players.map((player) => (
          <PlayerMarker key={player.shirtNumber} player={player} />
        ))}
      </div>
    </div>
  );
}

export default function PitchFormation({ homeFormation, awayFormation }: PitchFormationProps) {
  return (
    <SectionCard title="Lineups">
      <div className="flex flex-col gap-6">
        <FormationSide data={homeFormation} label="Home" />
        <FormationSide data={awayFormation} label="Away" />
      </div>
    </SectionCard>
  );
}