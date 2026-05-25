// components/player-page/AttributesCard.tsx
// Dark green card with horizontal attribute progress bars

import type { AttributeScore } from "@/lib/player-types";

interface AttributesCardProps {
  attributes: AttributeScore[];
}

function AttributeBar({ label, value }: AttributeScore) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-white/80 w-20 shrink-0 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-white/80 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-bold text-white w-6 text-right">{value}</span>
    </div>
  );
}

export default function AttributesCard({ attributes }: AttributesCardProps) {
  return (
    <div className="rounded-2xl bg-[var(--color-primary)] p-5 text-white">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
        Attributes
      </h3>
      <div className="flex flex-col gap-3.5">
        {attributes.map((attr) => (
          <AttributeBar key={attr.label} label={attr.label} value={attr.value} />
        ))}
      </div>
    </div>
  );
}