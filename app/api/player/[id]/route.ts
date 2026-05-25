// app/api/player/[id]/route.ts
// API route that fetches player details from RapidAPI with mock fallback

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import mockPlayerData from "@/lib/mockPlayerData";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid player ID" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-get-player-detail",
      params: { playerid: id },
      headers: {
        "x-rapidapi-key": process.env["X-RapidAPI-Key"] || "",
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.log(`Player API error (status ${status}): falling back to mock data`);

      // If quota exceeded or any API failure, return mock data
      console.log("API request failed — falling back to mock player data");
      return NextResponse.json({
        status: "success",
        response: mockPlayerData,
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch player details" },
      { status: 500 }
    );
  }
}