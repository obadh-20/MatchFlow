// components/trending-news/NewsCard.tsx
// Individual news card showing article thumbnail, title, description, source, and date

import Image from "next/image";
import type { ApiRapidNewsItem } from "@/types/api";

interface NewsCardProps {
  news: ApiRapidNewsItem;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-sm border border-[#e6d8c0] overflow-hidden hover:shadow-md hover:border-[#546B41]/30 transition-all duration-200 h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-44 bg-gray-100 overflow-hidden flex-shrink-0">
          {news.image ? (
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)]">
              <svg
                className="w-10 h-10 text-[#546B41]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Source badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#546B41] bg-[var(--color-primary-light)] px-2 py-0.5 rounded-full">
              {news.source}
            </span>
            <span className="text-[10px] text-gray-400">
              {news.date ? formatDate(news.date) : ""}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-[#171A1F] leading-snug mb-2 line-clamp-2">
            {news.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-3 flex-1">
            {news.description}
          </p>

          {/* Read more link */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#546B41] mt-auto">
            Read more
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}