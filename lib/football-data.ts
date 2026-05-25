// lib/football-data.ts
// Cached data-fetching functions using Next.js "use cache" directive

import { cacheLife, cacheTag } from "next/cache";
import { normalizeRapidLiveMatch, normalizeRapidMatch } from "./normalizers";
import type {
  ApiRapidLiveMatch,
  ApiRapidLiveResponse,
  ApiRapidMatch,
  ApiRapidMatchesResponse,
} from "@/types/api";
import type { Match } from "@/types/index";
import axios from "axios";

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function getApiKey(): string {
  return process.env["X-RapidAPI-Key"] || "";
}

/**
 * Fetches live matches and caches them.
 * Cache policy: ~1 min (stale: 10s, revalidate: 60s, expire: 120s)
 */
export async function getLiveMatches(): Promise<Match[]> {
  "use cache";
  cacheLife({ stale: 10, revalidate: 60, expire: 120 }); // ~1 minute
  cacheTag("live-matches");

  const apiKey = getApiKey();
  if (!apiKey) {
    console.log("API key not configured for live matches — returning empty");
    return [];
  }

try {
    const response = await axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-current-live",
      timeout: 5000,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    const data = response.data as ApiRapidLiveResponse;

    if (data.status !== "success" || !data.response?.live) {
      return [];
    }

    const liveMatches: ApiRapidLiveMatch[] = data.response.live;

    if (liveMatches.length === 0) {
      return [];
    }

    // Sort by timeTS (most recent first)
    liveMatches.sort((a, b) => a.timeTS - b.timeTS);

    return liveMatches.map(normalizeRapidLiveMatch);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(`Live matches API error (status ${error.response?.status})`);
      console.log(error.response?.data);
    }
    // Return empty array on error rather than crashing the home page
    return [];
  }
}

/**
 * Fetches events (finished/upcoming matches) and caches them.
 * Cache policy: ~1 day (stale: 1h, revalidate: 6h, expire: 24h)
 */
export async function getEvents(rawDate?: string): Promise<Match[]> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 21600, expire: 86400 }); // ~1 day
  cacheTag("events");

  const apiKey = getApiKey();
  if (!apiKey) {
    console.log("API key not configured for events — returning empty");
    return [];
  }

  const dateParam = rawDate;
  const targetDate = dateParam || formatDate(new Date());
  const isValidDate = /^\d{8}$/.test(targetDate);

  if (!isValidDate) {
    // Invalid date param — use today instead with yesterday and tomorrow
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dates = [yesterday, today, tomorrow].map(formatDate);

    const apiCalls = dates.map((date) =>
      axios.request({
        method: "GET",
        url: "https://free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date",
        params: { date },
        timeout: 5000,
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      })
    );

    const responses = await Promise.allSettled(apiCalls);

    const seenIds = new Set<number>();
    const allEvents: ApiRapidMatch[] = responses.flatMap((res) => {
      if (res.status === "fulfilled" && res.value.data?.response?.matches) {
        const data = res.value.data as ApiRapidMatchesResponse;
        return data.response.matches.filter((match: ApiRapidMatch) => {
          if (seenIds.has(match.id)) return false;
          seenIds.add(match.id);
          return true;
        });
      }
      return [];
    });

    if (allEvents.length === 0) {
      return [];
    }

    allEvents.sort(
      (a: ApiRapidMatch, b: ApiRapidMatch) => a.timeTS - b.timeTS
    );

    return allEvents.map(normalizeRapidMatch);
  }

  // Valid date — compute yesterday and tomorrow
  const year = Number(targetDate.slice(0, 4));
  const month = Number(targetDate.slice(4, 6)) - 1;
  const day = Number(targetDate.slice(6, 8));
  const parsedDate = new Date(year, month, day);

  const yesterday = new Date(parsedDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(parsedDate);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dates = [yesterday, parsedDate, tomorrow].map(formatDate);

  const apiCalls = dates.map((date) =>
    axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date",
      params: { date },
      timeout: 5000,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    })
  );

  const responses = await Promise.allSettled(apiCalls);

  const seenIds = new Set<number>();
  const allEvents: ApiRapidMatch[] = responses.flatMap((res) => {
    if (res.status === "fulfilled" && res.value.data?.response?.matches) {
      const data = res.value.data as ApiRapidMatchesResponse;
      return data.response.matches.filter((match: ApiRapidMatch) => {
        if (seenIds.has(match.id)) return false;
        seenIds.add(match.id);
        return true;
      });
    }
    return [];
  });

  if (allEvents.length === 0) {
    return [];
  }

  allEvents.sort(
    (a: ApiRapidMatch, b: ApiRapidMatch) => a.timeTS - b.timeTS
  );

  return allEvents.map(normalizeRapidMatch);
}