// components/match-detail/MatchTimeline.tsx
// Vertical timeline container for match events

import type { TimelineEvent as TimelineEventType } from "@/types/match-detail";
import SectionCard from "./SectionCard";
import TimelineEvent from "./TimelineEvent";

interface MatchTimelineProps {
  events: TimelineEventType[];
}

export default function MatchTimeline({ events }: MatchTimelineProps) {
  // Sort by minute ascending
  const sorted = [...events].sort((a, b) => a.minute - b.minute);

  // Separate by halves
  const firstHalf = sorted.filter((e) => e.minute <= 45);
  const secondHalf = sorted.filter((e) => e.minute > 45);

  return (
    <SectionCard title="Match Timeline">
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gray-200" />

        {firstHalf.length > 0 && (
          <div className="mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 ml-10">
              First Half
            </span>
          </div>
        )}

        {firstHalf.map((event) => (
          <TimelineEvent key={event.id} event={event} />
        ))}

        {secondHalf.length > 0 && (
          <div className="mb-2 mt-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 ml-10">
              Second Half
            </span>
          </div>
        )}

        {secondHalf.map((event) => (
          <TimelineEvent key={event.id} event={event} />
        ))}
      </div>
    </SectionCard>
  );
}