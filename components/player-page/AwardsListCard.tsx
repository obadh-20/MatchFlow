// components/player-page/AwardsListCard.tsx
// List of player achievements with icons

import { Trophy, Award as AwardIcon, Medal, Star } from "lucide-react";
import type { Award } from "@/lib/player-types";

interface AwardsListCardProps {
  awards: Award[];
}

const iconMap = [Trophy, AwardIcon, Medal, Star];

export default function AwardsListCard({ awards }: AwardsListCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm p-5 bg-[var(--color-bg-card)]">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Awards & Honours
      </h3>
      <div className="flex flex-col gap-3">
        {awards.map((award, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <div
              key={`${award.title}-${index}`}
              className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {award.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{award.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}