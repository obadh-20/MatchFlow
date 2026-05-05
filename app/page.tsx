import React from "react";
import MatchResult from "@/components/MatchResult"
import type { Match } from "@/types/index";

const page = () => {
  const staticMatch: Match = {
    id: 1,
    date: "2026-04-28",
    time: "21:00:00",
    kickoff: "2026-04-28T21:00:00Z",
    title: "Manchester United vs Liverpool",
    league: "Premier League",
    leagueBadgeUrl: "https://assets.codepen.io/285131/pl-logo.svg",
    season: "2025/26",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    homeScore: 2,
    awayScore: 1,
    round: 34,
    homeTeamBadgeUrl: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    awayTeamBadgeUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    venue: "Old Trafford",
    status: "live",
    thumbnailUrl: ""
  };

  return (
    <div className="w-full ">
      {/* <Matches/> match={staticMatch}*/}
      <MatchResult />
    </div>
  );
};

export default page;
