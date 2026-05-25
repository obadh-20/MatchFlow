// app/api/league/[id]/route.ts
// API route that proxies the RapidAPI football-get-league-detail endpoint

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { mockLeagueDetail } from "@/lib/mock-league-detail";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid league ID" },
      { status: 400 }
    );
  }

  const apiKey = process.env["X-RapidAPI-Key"];
  if (!apiKey) {
    console.log("API key not configured — using mock data for league detail");
    return NextResponse.json({
      status: "success",
      response: {
        detail: mockLeagueDetail,
      },
    });
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-get-league-detail",
      params: { leagueid: id },
      timeout: 5000,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.log(status);
      console.log(error.response?.data);

      // If quota exceeded (429), return mock data so the UI still works
      if (status === 429) {
        console.log("API quota exceeded — falling back to mock data for league detail");
        return NextResponse.json({
          status: "success",
          response: {
            detail: mockLeagueDetail,
          },
        });
      }
    }
    return NextResponse.json(
      { error: "Failed to fetch league details" },
      { status: 500 }
    );
  }
}