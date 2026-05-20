import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import axios from "axios";
import type { ApiRapidMatchDetailResponse } from "@/types/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connection();

  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid match ID" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-get-match-detail",
      params: { eventid: id },
      headers: {
        "x-rapidapi-key": process.env["X-RapidAPI-Key"] || "",
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    const data = response.data as ApiRapidMatchDetailResponse;

    if (data.status !== "success" || !data.response?.detail) {
      return NextResponse.json(
        { error: "Match not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data.response.detail);
  } catch (error) {
    console.error("Error fetching match detail:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch match details",
        message: "An error occurred while fetching match details",
      },
      { status: 500 }
    );
  }
}