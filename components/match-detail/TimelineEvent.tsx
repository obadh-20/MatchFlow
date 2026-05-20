// components/match-detail/TimelineEvent.tsx
// Single event item in the match timeline

import { Goal, Clock, ArrowUpDown } from "lucide-react";
import type { TimelineEvent as TimelineEventType } from "@/types/match-detail";

interface TimelineEventProps {
  event: TimelineEventType;
}

function EventIcon({ type }: { type: TimelineEventType["type"] }) {
  switch (type) {
    case "goal":
      return <Goal className="w-4 h-4 text-white" />;
    case "yellow-card":
      return (
        <div className="w-3 h-4 rounded-[2px] bg-yellow-400" />
      );
    case "red-card":
      return (
        <div className="w-3 h-4 rounded-[2px] bg-red-600" />
      );
    case "substitution":
      return <ArrowUpDown className="w-4 h-4 text-white" />;
  }
}

function EventDescription({ event }: { event: TimelineEventType }) {
  switch (event.type) {
    case "goal":
      return (
        <span>
          <span className="font-semibold text-gray-900">{event.player}</span>
          {event.assist && (
            <span className="text-gray-500">
              {" "}(assist: {event.assist})
            </span>
          )}
          <span className="ml-2 text-xs font-bold text-[var(--color-primary)]">
            {event.scoreHome}-{event.scoreAway}
          </span>
        </span>
      );
    case "yellow-card":
    case "red-card":
      return (
        <span>
          <span className="font-semibold text-gray-900">{event.player}</span>
          <span className="text-gray-500">
            {" "}{event.type === "yellow-card" ? "Yellow Card" : "Red Card"}
          </span>
        </span>
      );
    case "substitution":
      return (
        <span>
          <span className="font-semibold text-gray-900">{event.player}</span>
          <span className="text-gray-500"> replaces </span>
          <span className="font-semibold text-gray-900">{event.playerOff}</span>
        </span>
      );
  }
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  const bgColor = event.type === "goal"
    ? "bg-[var(--color-primary)]"
    : event.type === "red-card"
      ? "bg-red-600"
      : event.type === "yellow-card"
        ? "bg-yellow-400"
        : "bg-blue-500";

  return (
    <div className="flex items-start gap-3">
      {/* Timeline dot with icon */}
      <div className="flex flex-col items-center">
        <div className={`w-7 h-7 rounded-full ${bgColor} flex items-center justify-center shadow-sm shrink-0`}>
          <EventIcon type={event.type} />
        </div>
        {/* Vertical line (connector handled by parent) */}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 tabular-nums">{event.minute}</span>
        </div>
        <p className="text-xs leading-relaxed mt-0.5">
          <EventDescription event={event} />
        </p>
      </div>
    </div>
  );
}