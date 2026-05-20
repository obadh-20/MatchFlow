// components/match-detail/SectionCard.tsx
// Reusable card wrapper used across the entire match detail page

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function SectionCard({ children, title, className }: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-100 shadow-sm p-5",
        "bg-[var(--color-bg-card)]",
        className
      )}
    >
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}