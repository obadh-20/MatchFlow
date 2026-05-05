import { NextRequest, NextResponse } from "next/server";
import { normalizeMatch } from "@/lib/normalizers";
import axios from "axios";

const leagues = [
  "English_Premier_League",
  "English_League_Championship",
  "Scottish_Premier_League",
  "German_Bundesliga",
  "Italian_Serie_A",
  "French_Ligue_1",
  "Spanish_La_Liga",
  "Greek_Superleague_Greece",
  "Dutch_Eredivisie",
  "Belgian_Pro_League",
];

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("d");
  
  // Default to today if no date provided
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  try {
    // Make parallel requests for all leagues
    const apiCalls = leagues.map(league =>
      axios.get(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php`, {
        params: {
          d: targetDate,
          l: league,
        },
      })
    );
    
    const responses = await Promise.all(apiCalls);
 

    // Combine all events from all leagues
    const allEvents = responses.flatMap(res => res.data.events || []);
    console.log(`Fetched ${allEvents.length} events for date ${targetDate}`);
    
    if (allEvents.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const normalizedMatches = allEvents.map(normalizeMatch);
    
    return NextResponse.json(normalizedMatches);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({
      error: "Failed to fetch events",
      message: "An error occurred while searching for events"
    }, { status: 500 });
  }
}
