// types/match-detail.ts
// Domain-specific types for the match detail page

/** Match status pill variants */
export type MatchStatusPill = "live" | "finished" | "upcoming";

/** Hero header data for the match overview card */
export interface MatchHeaderData {
  leagueName: string;
  leagueBadgeUrl: string;
  status: MatchStatusPill;
  homeTeam: string;
  awayTeam: string;
  homeTeamBadgeUrl: string;
  awayTeamBadgeUrl: string;
  homeScore: number;
  awayScore: number;
  stadium: string;
  attendance: string;
  referee: string;
  var: string;
  liveTime?: string;
}

/** Player position on the pitch formation (percentage-based) */
export interface PlayerPosition {
  name: string;
  shirtNumber: number;
  top: number; // % from top
  left: number; // % from left
}

/** Formation data for a team */
export interface FormationData {
  formation: string; // e.g. "4-3-3"
  players: PlayerPosition[];
}

/** A single match stat */
export interface MatchStat {
  label: string;
  home: number;
  away: number;
}

/** A chronological data point for the momentum chart */
export interface MomentumPoint {
  minute: number;
  homeValue: number;
  awayValue: number;
}

/** Discriminated union for timeline events */
export type TimelineEventType = "goal" | "yellow-card" | "red-card" | "substitution";

export interface BaseTimelineEvent {
  id: string;
  minute: number;
  player: string;
  team: "home" | "away";
  type: TimelineEventType;
}

export interface GoalEvent extends BaseTimelineEvent {
  type: "goal";
  assist?: string;
  scoreHome: number;
  scoreAway: number;
}

export interface CardEvent extends BaseTimelineEvent {
  type: "yellow-card" | "red-card";
}

export interface SubstitutionEvent extends BaseTimelineEvent {
  type: "substitution";
  playerOff: string;
}

export type TimelineEvent = GoalEvent | CardEvent | SubstitutionEvent;

/** Player performance row for the table */
export interface PlayerPerformance {
  id: number;
  name: string;
  team: "home" | "away";
  rating: number;
  goals: number;
  assists: number;
  shots: number;
  passes: number;
  tackles: number;
}

/** Full mock match detail payload */
export interface MatchDetailData {
  header: MatchHeaderData;
  homeFormation: FormationData;
  awayFormation: FormationData;
  stats: MatchStat[];
  momentum: MomentumPoint[];
  timeline: TimelineEvent[];
  players: PlayerPerformance[];
}