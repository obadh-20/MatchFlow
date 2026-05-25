// components/player-page/PlayerInfoCard.tsx
// Key-value player details card with estimated value footer

import type { PlayerProfile } from "@/lib/player-types";

interface PlayerInfoCardProps {
  profile: PlayerProfile;
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

export default function PlayerInfoCard({ profile }: PlayerInfoCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm p-5 bg-[var(--color-bg-card)]">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
        Player Info
      </h3>
      <div>
        <InfoRow label="Nationality" value={profile.nationality} />
        <InfoRow label="Age" value={`${profile.age} years`} />
        <InfoRow label="Height" value={profile.height} />
        <InfoRow label="Weight" value={profile.weight} />
        <InfoRow label="Preferred Foot" value={profile.preferredFoot} />
        <InfoRow label="Date of Birth" value={profile.dateOfBirth} />
        <InfoRow label="Contract" value={`${profile.contractStart} – ${profile.contractEnd}`} />
      </div>
      {/* Estimated Value Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Estimated Value
        </span>
        <span className="text-base font-bold text-[var(--color-primary)]">
          {profile.estimatedValue}
        </span>
      </div>
    </div>
  );
}