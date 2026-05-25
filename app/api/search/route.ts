// app/api/search/route.ts
// API route that proxies the RapidAPI football-all-search endpoint

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { mockSearchResults } from "@/lib/mock-search-results";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({
      status: "success",
      response: { players: [], teams: [], leagues: [], matches: [] },
    });
  }

  const apiKey = process.env["X-RapidAPI-Key"];
  if (!apiKey) {
    console.log("API key not configured — using mock data for search");
    const searchTerm = query.trim().toLowerCase();
    const filtered = {
      players: mockSearchResults.players.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.nationality.toLowerCase().includes(searchTerm) ||
          p.teamName.toLowerCase().includes(searchTerm)
      ),
      teams: mockSearchResults.teams.filter((t) =>
        t.name.toLowerCase().includes(searchTerm)
      ),
      leagues: mockSearchResults.leagues.filter(
        (l) =>
          l.name.toLowerCase().includes(searchTerm) ||
          l.country.toLowerCase().includes(searchTerm)
      ),
      matches: mockSearchResults.matches.filter(
        (m) =>
          m.homeTeam.toLowerCase().includes(searchTerm) ||
          m.awayTeam.toLowerCase().includes(searchTerm) ||
          m.leagueName.toLowerCase().includes(searchTerm)
      ),
    };

    return NextResponse.json({
      status: "success",
      response: filtered,
    });
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-all-search",
      params: { search: query },
      timeout: 5000,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        return NextResponse.json(
          { error: "Search request timed out" },
          { status: 504 }
        );
      }

      const status = error.response?.status;
      console.log(status);

      // If quota exceeded (429), filter mock data by the search term
      if (status === 429) {
        console.log(
          "API quota exceeded — filtering mock data for search"
        );

        const searchTerm = query.trim().toLowerCase();

        const filtered = {
          players: mockSearchResults.players.filter(
            (p) =>
              p.name.toLowerCase().includes(searchTerm) ||
              p.nationality.toLowerCase().includes(searchTerm) ||
              p.teamName.toLowerCase().includes(searchTerm)
          ),
          teams: mockSearchResults.teams.filter((t) =>
            t.name.toLowerCase().includes(searchTerm)
          ),
          leagues: mockSearchResults.leagues.filter(
            (l) =>
              l.name.toLowerCase().includes(searchTerm) ||
              l.country.toLowerCase().includes(searchTerm)
          ),
          matches: mockSearchResults.matches.filter(
            (m) =>
              m.homeTeam.toLowerCase().includes(searchTerm) ||
              m.awayTeam.toLowerCase().includes(searchTerm) ||
              m.leagueName.toLowerCase().includes(searchTerm)
          ),
        };

        return NextResponse.json({
          status: "success",
          response: filtered,
        });
      }
    }
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}