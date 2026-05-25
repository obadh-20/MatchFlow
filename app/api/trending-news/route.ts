// app/api/trending-news/route.ts
// API route that proxies the RapidAPI football-get-trendingnews endpoint

import { NextResponse } from "next/server";
import axios from "axios";
import { mockTrendingNews } from "@/lib/mock-trending-news";

export async function GET() {
  const apiKey = process.env["X-RapidAPI-Key"];
  if (!apiKey) {
    console.log("API key not configured — using mock data for trending news");
    return NextResponse.json({
      status: "success",
      response: {
        news: mockTrendingNews,
      },
    });
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-get-trendingnews",
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
        console.log("API quota exceeded — falling back to mock data for trending news");
        return NextResponse.json({
          status: "success",
          response: {
            news: mockTrendingNews,
          },
        });
      }
    }
    return NextResponse.json(
      { error: "Failed to fetch trending news" },
      { status: 500 }
    );
  }
}