// components/match-detail/PlayerMarker.tsx
// Individual player dot on the pitch formation

import type { PlayerPosition } from "@/types/match-detail";

interface PlayerMarkerProps {
  player: PlayerPosition;
}

export default function PlayerMarker({ player }: PlayerMarkerProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
      style={{ top: `${player.top}%`, left: `${player.left}%` }}
    >
      {/* Dot */}
      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-sm border-2 border-white">
        <span className="text-[9px] md:text-[10px] font-bold text-white leading-none">
          {player.shirtNumber}
        </span>
      </div>
      {/* Name */}
      <span className="text-[9px] md:text-[10px] font-medium text-gray-800 bg-white/80 px-1 rounded whitespace-nowrap shadow-sm">
        {player.name}
      </span>
    </div>
  );
}