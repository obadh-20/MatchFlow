// app/api/match/route.ts
// API route that returns mock match detail data
// TODO: This is a temporary stub — integrate with RapidAPI
// football-get-match-detail endpoint once the API contract is stable.
// Currently returns static mock data unconditionally.

import { NextResponse } from "next/server";
import mockMatchData from "@/lib/mock-match-data";

export async function GET() {
  const apiKey = process.env["X-RapidAPI-Key"];
  if (!apiKey) {
    return NextResponse.json({
      response: mockMatchData,
    });
  }

  // TODO: Replace with real API call to RapidAPI football-get-match-detail
  // try { const response = await axios.request({ ... }); ... }
  // catch { fallback to mockMatchData }

  return NextResponse.json({
    response: mockMatchData,
  });
}
