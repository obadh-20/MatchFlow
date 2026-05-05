import { NextRequest, NextResponse } from "next/server";
import { ApiStandingsResponse } from "@/types/api";
import axios from "axios";
const leagues:Record<string,number> = {
    "EPL": 4328,
    "Laliga": 4335,
    "Bundesliga": 4331,
    "SerieA": 4332,
    "Ligue1": 4334
};
export async function GET(req: NextRequest) { 
    
    const league = req.nextUrl.searchParams.get("League")||"EPL";
    if (league === null) { 
        return NextResponse.json({
            error:"League query parameter is required",
            message:"Please provide a league query parameter. Valid values are: EPL, Laliga, Bundesliga, SerieA, Ligue1"
         },{status:400
        })
    }
    
    const res = axios.get(
      `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php`,
      {
        params: {
          l: leagues[league],
        },
      }
    );
const data:ApiStandingsResponse = (await res).data.table;
    return NextResponse.json(data);
    
}