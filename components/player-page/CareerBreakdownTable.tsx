// components/player-page/CareerBreakdownTable.tsx
// Historical season data table with rating pills

import type { CareerSeason } from "@/lib/player-types";

interface CareerBreakdownTableProps {
  career: CareerSeason[];
}

function RatingPill({ rating }: { rating: number }) {
  let colorClass = "bg-gray-100 text-gray-600";
  if (rating >= 8.0) {
    colorClass = "bg-[var(--color-primary-light)] text-[var(--color-primary)]";
  } else if (rating >= 7.5) {
    colorClass = "bg-green-50 text-green-700";
  }
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colorClass}`}>
      {rating.toFixed(1)}
    </span>
  );
}

export default function CareerBreakdownTable({ career }: CareerBreakdownTableProps) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm p-5 bg-[var(--color-bg-card)]">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Career Breakdown
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400 pb-2 pr-2 whitespace-nowrap">
                Season
              </th>
              <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400 pb-2 pr-2 whitespace-nowrap">
                Team
              </th>
              <th className="text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400 pb-2 pr-2 whitespace-nowrap">
                Apps
              </th>
              <th className="text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400 pb-2 pr-2 whitespace-nowrap">
                Goals
              </th>
              <th className="text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400 pb-2 pr-2 whitespace-nowrap">
                Assists
              </th>
              <th className="text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400 pb-2 whitespace-nowrap">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {career.map((season, index) => (
              <tr
                key={`${season.season}-${index}`}
                className="border-t border-gray-50 hover:bg-[var(--color-primary-light)] transition-colors"
              >
                <td className="py-2.5 pr-2">
                  <span className="text-xs font-semibold text-gray-800">{season.season}</span>
                </td>
                <td className="py-2.5 pr-2">
                  <span className="text-xs text-gray-700">{season.team}</span>
                </td>
                <td className="py-2.5 pr-2 text-center">
                  <span className="text-xs font-medium text-gray-700">{season.appearances}</span>
                </td>
                <td className="py-2.5 pr-2 text-center">
                  <span className="text-xs font-semibold text-gray-800">{season.goals}</span>
                </td>
                <td className="py-2.5 pr-2 text-center">
                  <span className="text-xs font-semibold text-gray-800">{season.assists}</span>
                </td>
                <td className="py-2.5 text-center">
                  <RatingPill rating={season.rating} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <button disabled aria-disabled className="text-xs font-semibold text-[var(--color-primary)] opacity-60 cursor-not-allowed">
          View Full History →
        </button>
      </div>
    </div>
  );
}