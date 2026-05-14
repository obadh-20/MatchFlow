import { NextRequest, NextResponse } from "next/server";
import { normalizeMatch } from "@/lib/normalizers";
import type { ApiMatch } from "@/types/api";
import axios from "axios";

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function GET(req: NextRequest) {
  const dateParam = req.nextUrl.searchParams.get("d");
  
  // Default to today if no date provided
  const targetDate = dateParam || formatDate(new Date());
  
  // Validate the date string — if invalid, fall back to today
  const parsedDate = new Date(targetDate);
  if (isNaN(parsedDate.getTime())) {
    // Invalid date param — use today instead
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dates = [yesterday, today, tomorrow].map(formatDate);
    
    try {
      const apiCalls = dates.map(date =>
        axios.get(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php`, {
          params: { d: date },
        })
      );
      
      const responses = await Promise.allSettled(apiCalls);
      
      // Collect only successful responses
      const seenIds = new Set<number>();
      const allEvents: ApiMatch[] = responses.flatMap(res => {
        if (res.status === "fulfilled" && res.value.data.events) {
          return res.value.data.events.filter((event: ApiMatch) => {
            const id = Number(event.idEvent);
            if (seenIds.has(id)) return false;
            seenIds.add(id);
            return true;
          });
        }
        return [];
      });
      
      console.log(`Fetched ${allEvents.length} events across 3 days`);
      
      if (allEvents.length === 0) {
        return NextResponse.json([], { status: 200 });
      }
      
      // Sort by date then time
      allEvents.sort((a: ApiMatch, b: ApiMatch) => {
        if (a.strDate < b.strDate) return -1;
        if (a.strDate > b.strDate) return 1;
        return (a.strTime || "").localeCompare(b.strTime || "");
      });
      
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
  
  // Valid date — compute yesterday and tomorrow
  const yesterday = new Date(parsedDate);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const tomorrow = new Date(parsedDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dates = [yesterday, parsedDate, tomorrow].map(formatDate);
  
  try {
    // Make parallel requests for all 3 dates (no league param needed — returns all leagues)
    const apiCalls = dates.map(date =>
      axios.get(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php`, {
        params: { d: date },
      })
    );
    
    const responses = await Promise.allSettled(apiCalls);
    
    // Combine all events, deduplicating by idEvent
    const seenIds = new Set<number>();
    const allEvents: ApiMatch[] = responses.flatMap(res => {
      if (res.status === "fulfilled" && res.value.data.events) {
        return res.value.data.events.filter((event: ApiMatch) => {
          const id = Number(event.idEvent);
          if (seenIds.has(id)) return false;
          seenIds.add(id);
          return true;
        });
      }
      return [];
    });
    
    console.log(`Fetched ${allEvents.length} events across 3 days`);
    
    if (allEvents.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    
    // Sort by date then time
    allEvents.sort((a: ApiMatch, b: ApiMatch) => {
      if (a.strDate < b.strDate) return -1;
      if (a.strDate > b.strDate) return 1;
      return (a.strTime || "").localeCompare(b.strTime || "");
    });
    
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