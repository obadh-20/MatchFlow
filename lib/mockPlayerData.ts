// lib/mockPlayerData.ts
// Mock data for the Player Profile page

import type { PlayerPageData } from "./player-types";

const mockPlayerData: PlayerPageData = {
  profile: {
    id: 1,
    name: "Marcus Rashford",
    position: "Forward",
    teamName: "Manchester United",
    leagueName: "English Premier League",
    nationality: "England",
    age: 28,
    height: "6'1\" (185 cm)",
    weight: "174 lbs (79 kg)",
    preferredFoot: "Right",
    dateOfBirth: "31 October 1997",
    contractStart: "July 2020",
    contractEnd: "June 2028",
    estimatedValue: "€75M",
    thumbUrl: "",
    cutoutUrl: "",
  },
  statSummary: {
    appearances: 38,
    goals: 21,
    assists: 8,
  },
  ratingTrend: [
    { date: "Match 1", rating: 7.2 },
    { date: "Match 2", rating: 6.8 },
    { date: "Match 3", rating: 8.1 },
    { date: "Match 4", rating: 7.5 },
    { date: "Match 5", rating: 6.9 },
    { date: "Match 6", rating: 8.4 },
    { date: "Match 7", rating: 7.8 },
    { date: "Match 8", rating: 8.9 },
    { date: "Match 9", rating: 7.1 },
    { date: "Match 10", rating: 7.6 },
    { date: "Match 11", rating: 8.2 },
    { date: "Match 12", rating: 8.7 },
  ],
  attributes: [
    { label: "Pace", value: 92 },
    { label: "Shooting", value: 85 },
    { label: "Passing", value: 80 },
    { label: "Dribbling", value: 88 },
    { label: "Defense", value: 35 },
  ],
  career: [
    { season: "2025/26", team: "Manchester United", appearances: 38, goals: 21, assists: 8, rating: 8.1 },
    { season: "2024/25", team: "Manchester United", appearances: 42, goals: 18, assists: 10, rating: 7.8 },
    { season: "2023/24", team: "Manchester United", appearances: 36, goals: 15, assists: 7, rating: 7.5 },
    { season: "2022/23", team: "Manchester United", appearances: 44, goals: 24, assists: 11, rating: 8.3 },
    { season: "2021/22", team: "Manchester United", appearances: 32, goals: 12, assists: 5, rating: 7.0 },
  ],
  awards: [
    { title: "Premier League Player of the Month", subtitle: "September 2024" },
    { title: "PFA Fans' Player of the Year", subtitle: "2022/23 Season" },
    { title: "Manchester United Player of the Season", subtitle: "2022/23" },
    { title: "EFL Cup Winner", subtitle: "2022/23 Season" },
  ],
  similarPlayers: [
    { id: 2, name: "Kylian Mbappé", team: "Real Madrid", rating: 91, thumbUrl: "" },
    { id: 3, name: "Vinícius Jr.", team: "Real Madrid", rating: 90, thumbUrl: "" },
    { id: 4, name: "Bukayo Saka", team: "Arsenal", rating: 87, thumbUrl: "" },
    { id: 5, name: "Phil Foden", team: "Manchester City", rating: 88, thumbUrl: "" },
  ],
};

export default mockPlayerData;