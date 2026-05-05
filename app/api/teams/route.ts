import { NextRequest, NextResponse } from "next/server";
import { ApiTeamsResponse } from "@/types/api";
import { normalizeTeam } from "@/lib/normalizers";
import axios from "axios";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get("t");
  
  if (!searchTerm) {
    return NextResponse.json({
      error: "Search term is required",
      message: "Please provide a 't' query parameter with the team name to search for"
    }, { status: 400 });
  }

  try {
    const res = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/123/searchteams.php`,
      {
        params: {
          t: searchTerm,
        },
      }
    );

    const data: ApiTeamsResponse = res.data;
    
    if (!data.teams) {
      return NextResponse.json([], { status: 200 });
    }

    const normalizedTeams = data.teams.map(normalizeTeam);
    
    return NextResponse.json(normalizedTeams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json({
      error: "Failed to fetch teams",
      message: "An error occurred while searching for teams"
    }, { status: 500 });
  }
}