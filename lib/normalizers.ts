// lib/normalizers.ts
import type { ApiStanding, ApiMatch, ApiTeam, ApiPlayer, ApiRapidMatch, ApiRapidLiveMatch } from "@/types/api";
import type {
  Standing,
  Match,
  Team,
  Player,
  StandingZone,
  MatchStatus,
} from "@/types/index";

function getZone(description: string): StandingZone {
  const d = description.toLowerCase();
  if (d.includes("champions league")) return "champions-league";
  if (d.includes("europa league")) return "europa-league";
  if (d.includes("conference league")) return "conference-league";
  if (d.includes("relegation")) return "relegation";
  return "mid-table";
}

function getMatchStatus(raw: string | null): MatchStatus {
  if (!raw) return "upcoming";
  if (raw === "Match Finished") return "finished";
  if (raw.toLowerCase().includes("progress") || raw === "HT") return "live";
  if (raw.toLowerCase().includes("postponed")) return "postponed";
  return "upcoming";
}

export function normalizeStanding(raw: ApiStanding): Standing {
  return {
    id: Number(raw.idStanding),
    rank: Number(raw.intRank),
    teamId: Number(raw.idTeam),
    teamName: raw.strTeam,
    badgeUrl: raw.strBadge,
    leagueId: Number(raw.idLeague),
    leagueName: raw.strLeague,
    season: raw.strSeason,
    form: raw.strForm.split(""), // "WWWWD" → ["W","W","W","W","D"]
    description: raw.strDescription,
    played: Number(raw.intPlayed),
    won: Number(raw.intWin),
    lost: Number(raw.intLoss),
    drawn: Number(raw.intDraw),
    goalsFor: Number(raw.intGoalsFor),
    goalsAgainst: Number(raw.intGoalsAgainst),
    goalDifference: Number(raw.intGoalDifference),
    points: Number(raw.intPoints),
    zone: getZone(raw.strDescription),
    lastUpdated: raw.dateUpdated,
  };
}

export function normalizeMatch(raw: ApiMatch): Match {
  return {
    id: Number(raw.idEvent),
    date: raw.strDate,
    time: raw.strTime,
    kickoff: raw.strTimestamp,
    title: raw.strEvent,
    league: raw.strLeague,
    leagueBadgeUrl: raw.strLeagueBadge,
    season: raw.strSeason,
    homeTeam: raw.strHomeTeam,
    awayTeam: raw.strAwayTeam,
    homeScore: raw.intHomeScore !== null ? Number(raw.intHomeScore) : null,
    awayScore: raw.intAwayScore !== null ? Number(raw.intAwayScore) : null,
    round: Number(raw.intRound),
    homeTeamBadgeUrl: raw.strHomeTeamBadge,
    awayTeamBadgeUrl: raw.strAwayTeamBadge,
    venue: raw.strVenue,
    status: getMatchStatus(raw.strStatus),
    thumbnailUrl: raw.strThumb,
  };
}

export function normalizeTeam(raw: ApiTeam): Team {
  return {
    id: Number(raw.idTeam),
    name: raw.strTeam,
    shortName: raw.strTeamShort,
    alternateName: raw.strTeamAlternate,
    leagueName: raw.strLeague,
    leagueId: Number(raw.idLeague),
    location: raw.strLocation,
    description: raw.strDescription,
    badgeUrl: raw.strBadge,
    keywords: raw.strKeywords?.split(",").map((k) => k.trim()) ?? [],
  };
}

export function normalizePlayer(raw: ApiPlayer): Player {
  return {
    id: Number(raw.idPlayer),
    teamId: Number(raw.idTeam),
    name: raw.strPlayer,
    teamName: raw.strTeam,
    sport: raw.strSport,
    thumbUrl: raw.strThumb,
    cutoutUrl: raw.strCutout,
    nationality: raw.strNationality,
    dateOfBirth: raw.dateBorn,
    isActive: raw.strStatus === "Active",
    position: raw.strPosition,
  };
}

const LEAGUE_NAMES: Record<number, string> = {
  47: "Premier League",
  87: "La Liga",
  135: "Serie A",
  54: "Bundesliga",
  53: "Ligue 1",
};

function getLeagueName(leagueId: number): string {
  return LEAGUE_NAMES[leagueId] ?? `League ${leagueId}`;
}

function getRapidMatchStatus(ms: ApiRapidMatch["status"]): MatchStatus {
  if (ms.cancelled) return "postponed";
  if (ms.finished) return "finished";
  if (ms.started) return "live";
  return "upcoming";
}

function getRapidLiveMatchStatus(ms: ApiRapidLiveMatch["status"]): MatchStatus {
  if (ms.cancelled) return "postponed";
  if (ms.finished) return "finished";
  if (ms.started) return "live";
  return "upcoming";
}

export function normalizeRapidLiveMatch(raw: ApiRapidLiveMatch): Match {
  const utcDate = new Date(raw.status.utcTime);
  const dateStr = utcDate.toISOString().split("T")[0];
  const timeStr = utcDate.toTimeString().split(" ")[0];

  return {
    id: raw.id,
    date: dateStr,
    time: timeStr,
    kickoff: raw.status.utcTime,
    title: `${raw.home.name} vs ${raw.away.name}`,
    league: getLeagueName(raw.leagueId),
    leagueBadgeUrl: "",
    season: "",
    homeTeam: raw.home.longName || raw.home.name,
    awayTeam: raw.away.longName || raw.away.name,
    homeScore: raw.home.score ?? null,
    awayScore: raw.away.score ?? null,
    round: Number(raw.tournamentStage),
    homeTeamBadgeUrl: "",
    awayTeamBadgeUrl: "",
    venue: "",
    status: getRapidLiveMatchStatus(raw.status),
    thumbnailUrl: "",
    liveTime: raw.status.liveTime?.short?.trim() || undefined,
  };
}

export function normalizeRapidMatch(raw: ApiRapidMatch): Match {
  const utcDate = new Date(raw.status.utcTime);
  const dateStr = utcDate.toISOString().split("T")[0];
  const timeStr = utcDate.toTimeString().split(" ")[0];

  return {
    id: raw.id,
    date: dateStr,
    time: timeStr,
    kickoff: raw.status.utcTime,
    title: `${raw.home.name} vs ${raw.away.name}`,
    league: getLeagueName(raw.leagueId),
    leagueBadgeUrl: "",
    season: "",
    homeTeam: raw.home.longName || raw.home.name,
    awayTeam: raw.away.longName || raw.away.name,
    homeScore: raw.home.score ?? null,
    awayScore: raw.away.score ?? null,
    round: Number(raw.tournamentStage),
    homeTeamBadgeUrl: "",
    awayTeamBadgeUrl: "",
    venue: "",
    status: getRapidMatchStatus(raw.status),
    thumbnailUrl: "",
  };
}
