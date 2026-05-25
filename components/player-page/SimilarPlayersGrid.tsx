// components/player-page/SimilarPlayersGrid.tsx
// Grid of similar player comparison cards

import type { SimilarPlayer } from "@/lib/player-types";

interface SimilarPlayersGridProps {
  players: SimilarPlayer[];
}

function PlayerAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)] text-sm font-bold">
      {initials}
    </div>
  );
}

export default function SimilarPlayersGrid({ players }: SimilarPlayersGridProps) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm p-5 bg-[var(--color-bg-card)]">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Similar Players
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="rounded-xl border border-gray-100 bg-white p-4 relative hover:shadow-md transition-shadow"
          >
            {/* Rating pill - top right */}
            <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              {player.rating}
            </span>

            {/* Avatar */}
            <div className="flex items-center gap-3 mb-3">
              <PlayerAvatar name={player.name} />
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 leading-tight truncate">
                  {player.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{player.team}</p>
              </div>
            </div>

            {/* Compare link */}
            <button disabled aria-disabled className="text-xs font-semibold text-[var(--color-primary)] opacity-60 cursor-not-allowed mt-1">
              Compare Stats →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}