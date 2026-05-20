import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import { getEvents } from "@/lib/football-data";

export async function GET(req: NextRequest) {
  // Force dynamic — routes using "use cache" should not prerender during build
  await connection();

  const dateParam = req.nextUrl.searchParams.get("d") || undefined;

  try {
    const matches = await getEvents(dateParam);
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch events",
        message: "An error occurred while searching for events",
      },
      { status: 500 }
    );
  }
}
