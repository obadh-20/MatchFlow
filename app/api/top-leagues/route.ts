// app/api/top-leagues/route.ts
// API route that proxies the RapidAPI football-popular-leagues endpoint

import { NextResponse } from "next/server";
import axios from "axios";
import { mockPopularLeagues } from "@/lib/mock-popular-leagues";

export async function GET() {
  const apiKey = process.env["X-RapidAPI-Key"];
  if (!apiKey) {
    console.log("API key not configured — using mock data for top leagues");
    return NextResponse.json({
      status: "success",
      response: {
        leagues: mockPopularLeagues,
      },
    });
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-popular-leagues",
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
        console.log("API quota exceeded — falling back to mock data for top leagues");
        return NextResponse.json({
          status: "success",
          response: {
            leagues: mockPopularLeagues,
          },
        });
      }
    }
    return NextResponse.json(
      { error: "Failed to fetch top leagues" },
      { status: 500 }
    );
  }
}