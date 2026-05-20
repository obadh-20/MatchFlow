// types/index.ts
// ✅ Import these everywhere in your app

export type StandingZone =
  | "champions-league"
  | "europa-league"
  | "conference-league"
  | "relegation"
  | "mid-table";

export type MatchStatus = "upcoming" | "live" | "finished" | "postponed";

export type LeagueId = "epl" | "laliga";

export interface Team {
  id: number;
  name: string;
  shortName: string;
  alternateName: string;
  leagueName: string;
  leagueId: number;
  location: string;
  description: string;
  badgeUrl: string;
  keywords: string[]; // parsed from comma-separated string
}

export interface Player {
  id: number;
  teamId: number;
  name: string;
  teamName: string;
  sport: string;
  thumbUrl: string;
  cutoutUrl: string;
  nationality: string;
  dateOfBirth: string; // keep as string, format in UI
  isActive: boolean; // parsed from "Active" | "Retired"
  position: string;
}

export interface Match {
  id: number;
  date: string; // "2026-04-05"
  time: string; // "14:00:00"
  kickoff: string; // ISO timestamp for sorting
  title: string; // "Arsenal vs Chelsea"
  league: string;
  leagueBadgeUrl: string;
  season: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null; // null = not played yet
  awayScore: number | null;
  round: number;
  homeTeamBadgeUrl: string;
  awayTeamBadgeUrl: string;
  venue: string;
  status: MatchStatus; // computed, not raw string
  thumbnailUrl: string;
  liveTime?: string; // e.g. "63‎’‎" for live matches
}

export interface Standing {
  id: number;
  rank: number;
  teamId: number;
  teamName: string;
  badgeUrl: string;
  leagueId: number;
  leagueName: string;
  season: string;
  form: string[]; // ["W","W","W","W","D"] parsed from "WWWWD"
  description: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  zone: StandingZone; // computed from description
  lastUpdated: string;
}

export interface League {
  id: number;
  key: LeagueId;
  name: string;
  alternateName: string;
  currentSeason: string;
  country: string;
  description: string;
  bannerUrl: string;
  posterUrl: string;
  trophyUrl: string;
  logoUrl: string;
}
