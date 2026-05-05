// types/api.ts
// ⚠️ Never import these into components — only into normalizers

export interface ApiTeam {
  idTeam: string; // "133604"
  strTeam: string; // "Arsenal"
  strTeamAlternate: string;
  strTeamShort: string;
  strLeague: string;
  idLeague: string; // "4328"
  strKeywords: string; // "Gunners,AFC"
  strLocation: string;
  strDescription: string;
  strBadge: string;
}

export interface ApiPlayer {
  idPlayer: string; // "34145575"
  idTeam: string; // "133604"
  strPlayer: string; // "Bukayo Saka"
  strTeam: string;
  strSport: string;
  strThumb: string;
  strCutout: string;
  strNationality: string;
  dateBorn: string; // "2001-09-05"
  strStatus: string; // "Active"
  strPosition: string; // "Midfielder"
}

export interface ApiMatch {
  idEvent: string; // "1896627"
  strTimestamp: string; // "2026-04-05T14:00:00+00:00"
  strDate: string; // "2026-04-05"
  strTime: string; // "14:00:00"
  strEvent: string; // "Arsenal vs Chelsea"
  strLeague: string;
  strLeagueBadge: string;
  strSeason: string; // "2025-2026"
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null; // null if not played yet
  intAwayScore: string | null;
  intRound: string; // "32"
  strHomeTeamBadge: string;
  strAwayTeamBadge: string;
  strVenue: string;
  strStatus: string | null; // "Match Finished" | "In Progress" | null
  strThumb: string;
}

export interface ApiStanding {
  idStanding: string; // "9276382"
  intRank: string; // "1"
  idTeam: string; // "133604"
  strTeam: string;
  strBadge: string;
  idLeague: string; // "4328"
  strLeague: string;
  strSeason: string;
  strForm: string; // "WWWWD"
  strDescription: string; // "Promotion - Champions League (League phase)"
  intPlayed: string;
  intWin: string;
  intLoss: string;
  intDraw: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intGoalDifference: string;
  intPoints: string;
  dateUpdated: string;
}

// API response wrappers — what the endpoint actually returns
export interface ApiTeamsResponse {
  teams: ApiTeam[] | null;
}

export interface ApiPlayersResponse {
  player: ApiPlayer[] | null;
}

export interface ApiMatchesResponse {
  events: ApiMatch[] | null;
}

export interface ApiStandingsResponse {
  table: ApiStanding[] | null;
}
