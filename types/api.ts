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
  strStatus: string | null; 
  strThumb: string;
  strSport:string;
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

// --- RapidAPI match types (new free-api-live-football-data API) ---

export interface ApiRapidMatch {
  id: number;
  leagueId: number;
  time: string; // "13.05.2026 21:00"
  home: {
    id: number;
    score: number | null;
    name: string;
    longName: string;
  };
  away: {
    id: number;
    score: number | null;
    name: string;
    longName: string;
  };
  eliminatedTeamId: number | null;
  statusId: number;
  tournamentStage: string; // "31"
  status: {
    utcTime: string; // "2026-05-13T19:00:00.000Z"
    halfs: {
      firstHalfStarted?: string;
      secondHalfStarted?: string;
    };
    periodLength: number;
    finished: boolean;
    started: boolean;
    cancelled: boolean;
    awarded: boolean;
    scoreStr: string; // "3 - 0"
    reason: {
      short: string;
      shortKey: string;
      long: string;
      longKey: string;
    };
  };
  timeTS: number;
}

export interface ApiRapidLiveMatch {
  id: number;
  leagueId: number;
  time: string;
  home: {
    id: number;
    score: number | null;
    name: string;
    longName: string;
  };
  away: {
    id: number;
    score: number | null;
    name: string;
    longName: string;
  };
  eliminatedTeamId: number | null;
  statusId: number;
  tournamentStage: string;
  status: {
    utcTime: string;
    halfs: {
      firstHalfStarted?: string;
      secondHalfStarted?: string;
    };
    periodLength: number;
    finished: boolean;
    started: boolean;
    cancelled: boolean;
    ongoing: boolean;
    scoreStr: string;
    liveTime: {
      short: string;
      shortKey: string;
      long: string;
      longKey: string;
      maxTime: number;
      basePeriod: number;
      addedTime: number;
    };
  };
  timeTS: number;
}

export interface ApiRapidMatchDetailTeam {
  name: string;
  id: number;
}

export interface ApiRapidMatchDetailColors {
  darkMode: {
    home: string;
    away: string;
  };
  lightMode: {
    home: string;
    away: string;
  };
  fontDarkMode: {
    home: string;
    away: string;
  };
  fontLightMode: {
    home: string;
    away: string;
  };
}

export interface ApiRapidMatchDetail {
  matchId: string;
  matchName: string;
  matchRound: string;
  teamColors: ApiRapidMatchDetailColors;
  leagueId: number;
  leagueName: string;
  leagueRoundName: string;
  parentLeagueId: number;
  countryCode: string;
  homeTeam: ApiRapidMatchDetailTeam;
  awayTeam: ApiRapidMatchDetailTeam;
  coverageLevel: string;
  matchTimeUTC: string;
  matchTimeUTCDate: string;
  started: boolean;
  finished: boolean;
  gender: string;
}

export interface ApiRapidMatchDetailResponse {
  status: string;
  response: {
    detail: ApiRapidMatchDetail;
  };
}

export interface ApiRapidLiveResponse {
  status: string; // "success"
  response: {
    live: ApiRapidLiveMatch[];
  };
}

export interface ApiRapidMatchesResponse {
  status: string; // "success"
  response: {
    matches: ApiRapidMatch[];
  };
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

// --- Top Transfers ---

export interface ApiRapidTopTransfer {
  id: number;
  player_name: string;
  age: string;
  date: string;
  from_club: {
    id: number;
    name: string;
    logo: string;
  };
  to_club: {
    id: number;
    name: string;
    logo: string;
  };
  fee: string;
  market_value: string;
  position: string;
  nationality: string;
  photo: string;
  league: string;
  season: string;
}

export interface ApiRapidTopTransfersResponse {
  status: string;
  response: {
    transfers: ApiRapidTopTransfer[];
  };
}

// --- Popular Leagues ---

export interface ApiRapidLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: string;
  seasonName: string;
  seasonSlug: string;
}

export interface ApiRapidPopularLeaguesResponse {
  status: string;
  response: {
    leagues: ApiRapidLeague[];
  };
}

// --- League Detail ---

export interface ApiRapidLeagueDetailTeam {
  id: number;
  name: string;
  logo: string;
  position: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface ApiRapidLeagueDetailTopScorer {
  id: number;
  playerName: string;
  teamName: string;
  teamLogo: string;
  goals: number;
  nationality: string;
  photo: string;
}

export interface ApiRapidLeagueDetail {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  seasonName: string;
  seasonSlug: string;
  teams: ApiRapidLeagueDetailTeam[];
  topScorers: ApiRapidLeagueDetailTopScorer[];
}

export interface ApiRapidLeagueDetailResponse {
  status: string;
  response: {
    detail: ApiRapidLeagueDetail;
  };
}

// --- Trending News ---

export interface ApiRapidNewsItem {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  date: string;
  time: string;
}

export interface ApiRapidTrendingNewsResponse {
  status: string;
  response: {
    news: ApiRapidNewsItem[];
  };
}

// --- Search ---

export interface ApiRapidSearchTeam {
  id: number;
  name: string;
  logo: string;
}

export interface ApiRapidSearchPlayer {
  id: number;
  name: string;
  photo: string;
  nationality: string;
  position: string;
  teamName: string;
  teamLogo: string;
}

export interface ApiRapidSearchLeague {
  id: number;
  name: string;
  logo: string;
  country: string;
  flag: string;
}

export interface ApiRapidSearchMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  leagueName: string;
  time: string;
  status: string;
}

export interface ApiRapidSearchResults {
  players: ApiRapidSearchPlayer[];
  teams: ApiRapidSearchTeam[];
  leagues: ApiRapidSearchLeague[];
  matches: ApiRapidSearchMatch[];
}

export interface ApiRapidSearchResponse {
  status: string;
  response: ApiRapidSearchResults;
}
