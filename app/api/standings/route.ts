import { NextRequest, NextResponse } from "next/server";
import { ApiStandingsResponse } from "@/types/api";
import axios from "axios";

const leagues: Record<string, number> = {
  EPL: 4328,
  Laliga: 4335,
  Bundesliga: 4331,
  SerieA: 4332,
  Ligue1: 4334,
};

export async function GET(req: NextRequest) {
  const league = req.nextUrl.searchParams.get("League") || "EPL";

  if (!leagues[league]) {
    return NextResponse.json(
      {
        error: "Invalid league",
        message:
          "Please provide a valid league query parameter. Valid values are: EPL, Laliga, Bundesliga, SerieA, Ligue1",
      },
      { status: 400 }
    );
  }

  try {
    const res = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php`,
      {
        params: {
          l: leagues[league],
        },
        timeout: 5000,
      }
    );

    // TheSportsDB returns the table array directly as response.data
    const data = res.data as ApiStandingsResponse;
    const table = data?.table ?? [];

    return NextResponse.json(table, { status: 200 });
  } catch (error) {
    console.error("Error fetching standings:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch standings",
        message: "An error occurred while fetching standings",
      },
      { status: 500 }
    );
  }
}