import { NextResponse } from "next/server";
import { connection } from "next/server";
import { getLiveMatches } from "@/lib/football-data";

export async function GET() {
  // Force dynamic — short-lived "use cache" cannot prerender during build
  await connection();

  try {
    const matches = await getLiveMatches();
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch live matches",
        message: "An error occurred while fetching live matches",
      },
      { status: 500 }
    );
  }
}
