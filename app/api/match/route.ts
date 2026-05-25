// app/api/match/route.ts
// API route that returns mock match detail data

import { NextResponse } from "next/server";
import mockMatchData from "@/lib/mock-match-data";

export async function GET() {
  return NextResponse.json({
    response: mockMatchData,
  });
}