// app/news/page.tsx
// Trending News page — displays trending football news articles

"use client";

import { useEffect, useState } from "react";
import type { ApiRapidNewsItem } from "@/types/api";
import NewsCard from "@/components/trending-news/NewsCard";

export default function NewsPage() {
  const [news, setNews] = useState<ApiRapidNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/trending-news");

        if (!response.ok) {
          throw new Error("Failed to fetch trending news");
        }

        const data = await response.json();

        // The API returns { status, response: { news: [...] } }
        const newsList = data?.response?.news ?? data?.news ?? [];

        setNews(newsList);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Trending News
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[360px] bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Trending News
        </h2>
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-red-300 text-red-500 text-sm">
          {error}
        </div>
      </div>
    );
  }

  // Empty state
  if (news.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-8">
          Trending News
        </h2>
        <div className="min-h-[200px] flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 text-sm">
          No news articles found
        </div>
      </div>
    );
  }

  // Data state
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      <h2 className="text-gray-900 font-bold text-[34px] leading-[1.0] mb-2">
        Trending News
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        The latest headlines from the world of football
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {news.map((article) => (
          <NewsCard key={article.id} news={article} />
        ))}
      </div>
    </div>
  );
}