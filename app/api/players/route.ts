import { NextRequest, NextResponse } from "next/server";
import { ApiPlayersResponse } from "@/types/api";
import { normalizePlayer } from "@/lib/normalizers";
import axios from "axios";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get("t");
  
  if (!searchTerm) {
    return NextResponse.json({
      error: "Search term is required",
      message: "Please provide a 't' query parameter with the player name to search for"
    }, { status: 400 });
  }

  try {
    const res = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php`,
      {
        params: {
          p: searchTerm,
        },
      }
    );

    const data: ApiPlayersResponse = res.data;
    
    if (!data.player) {
      return NextResponse.json([], { status: 200 });
    }

    const normalizedPlayers = data.player.map(normalizePlayer);
      
      const PLayer = normalizedPlayers[0];
      
    return NextResponse.json(PLayer, { status: 200 });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({
      error: "Failed to fetch players",
      message: "An error occurred while searching for players"
    }, { status: 500 });
  }
}