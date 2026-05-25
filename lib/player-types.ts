// lib/player-types.ts
// TypeScript interfaces for the Player Profile page

export interface PlayerProfile {
  id: number;
  name: string;
  position: string;
  teamName: string;
  leagueName: string;
  nationality: string;
  age: number;
  height: string;
  weight: string;
  preferredFoot: "Left" | "Right" | "Both";
  dateOfBirth: string;
  contractStart: string;
  contractEnd: string;
  estimatedValue: string;
  thumbUrl: string;
  cutoutUrl: string;
}

export interface StatSummary {
  appearances: number;
  goals: number;
  assists: number;
}

export interface RatingTrendPoint {
  date: string;
  rating: number;
}

export interface AttributeScore {
  label: string;
  value: number; // 0–100
}

export interface CareerSeason {
  season: string;
  team: string;
  appearances: number;
  goals: number;
  assists: number;
  rating: number;
}

export interface Award {
  title: string;
  subtitle: string;
}

export interface SimilarPlayer {
  id: number;
  name: string;
  team: string;
  rating: number;
  thumbUrl: string;
}

export interface PlayerPageData {
  profile: PlayerProfile;
  statSummary: StatSummary;
  ratingTrend: RatingTrendPoint[];
  attributes: AttributeScore[];
  career: CareerSeason[];
  awards: Award[];
  similarPlayers: SimilarPlayer[];
}