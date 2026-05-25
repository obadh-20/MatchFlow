// lib/mock-trending-news.ts
// Mock data for trending news — used as fallback when the RapidAPI quota is exceeded (429)

import type { ApiRapidNewsItem } from "@/types/api";

export const mockTrendingNews: ApiRapidNewsItem[] = [
  {
    id: 1,
    title: "Real Madrid Complete Blockbuster Signing of Kylian Mbappé",
    description:
      "Real Madrid have officially announced the signing of Kylian Mbappé on a free transfer from Paris Saint-Germain. The French superstar joins on a five-year deal worth a reported €50 million per season.",
    url: "https://example.com/news/real-madrid-mbappe",
    image: "https://media.api-sports.io/football/players/276.png",
    source: "Football Insider",
    date: "2026-05-22",
    time: "14:30",
  },
  {
    id: 2,
    title: "Premier League 2026/27 Fixtures Revealed",
    description:
      "The Premier League has announced the full fixture list for the upcoming 2026/27 season. Opening weekend features a blockbuster clash between Manchester City and Arsenal.",
    url: "https://example.com/news/premier-league-fixtures",
    image: "https://media.api-sports.io/football/leagues/39.png",
    source: "Premier League Official",
    date: "2026-05-21",
    time: "10:00",
  },
  {
    id: 3,
    title: "Erling Haaland Breaks Premier League Scoring Record",
    description:
      "Manchester City striker Erling Haaland has set a new Premier League scoring record with 38 goals in a single season, surpassing the previous record of 36 held by Alan Shearer and Andy Cole.",
    url: "https://example.com/news/haaland-record",
    image: "https://media.api-sports.io/football/players/1100.png",
    source: "BBC Sport",
    date: "2026-05-20",
    time: "16:45",
  },
  {
    id: 4,
    title: "Barcelona Eyeing Return of Lionel Messi as Ambassador",
    description:
      "Barcelona are planning to bring Lionel Messi back to the club in an ambassadorial role, according to club president Joan Laporta. The Argentine legend left PSG earlier this year.",
    url: "https://example.com/news/messi-barcelona",
    image: "https://media.api-sports.io/football/players/282.png",
    source: "Mundo Deportivo",
    date: "2026-05-19",
    time: "09:15",
  },
  {
    id: 5,
    title: "UEFA Announces Expanded Champions League Format Changes",
    description:
      "UEFA has confirmed significant changes to the Champions League format starting from the 2027/28 season, including an expanded 40-team group stage and a new knockout structure.",
    url: "https://example.com/news/uefa-champions-league-changes",
    image: "https://media.api-sports.io/football/leagues/2.png",
    source: "UEFA Official",
    date: "2026-05-18",
    time: "12:00",
  },
  {
    id: 6,
    title: "Jude Bellingham Wins PFA Player of the Year",
    description:
      "Real Madrid and England midfielder Jude Bellingham has been named the PFA Player of the Year following an outstanding season where he scored 22 goals and provided 12 assists.",
    url: "https://example.com/news/bellingham-pfa",
    image: "https://media.api-sports.io/football/players/16823.png",
    source: "Sky Sports",
    date: "2026-05-17",
    time: "20:30",
  },
  {
    id: 7,
    title: "AC Milan Clinch Serie A Title After Dramatic Final Day",
    description:
      "AC Milan have won the Serie A title for the first time since 2022 after a dramatic 3-2 victory over Sassuolo on the final day of the season, edging out Inter Milan on goal difference.",
    url: "https://example.com/news/ac-milan-serie-a",
    image: "https://media.api-sports.io/football/leagues/135.png",
    source: "Gazzetta dello Sport",
    date: "2026-05-16",
    time: "22:00",
  },
  {
    id: 8,
    title: "Chelsea Appoint New Manager for Upcoming Season",
    description:
      "Chelsea have appointed Sebastien Hoeness as their new head coach on a three-year contract. The German tactician joins from VfB Stuttgart where he impressed with attacking football.",
    url: "https://example.com/news/chelsea-new-manager",
    image: "https://media.api-sports.io/football/teams/49.png",
    source: "The Athletic",
    date: "2026-05-15",
    time: "15:00",
  },
  {
    id: 9,
    title: "Transfer Window Roundup: Biggest Deals So Far",
    description:
      "With the summer transfer window in full swing, we round up the biggest completed deals including Mbappé to Real Madrid, Musiala to Manchester City, and Davies to Barcelona.",
    url: "https://example.com/news/transfer-roundup",
    image: "https://media.api-sports.io/football/players/276.png",
    source: "TransferMarkt",
    date: "2026-05-14",
    time: "11:30",
  },
  {
    id: 10,
    title: "World Cup 2030: Joint Bid Details Revealed",
    description:
      "The joint bid from Morocco, Portugal, and Spain for the 2030 FIFA World Cup has revealed stunning stadium plans and infrastructure projects worth over $25 billion.",
    url: "https://example.com/news/world-cup-2030",
    image: "https://media.api-sports.io/football/leagues/2.png",
    source: "FIFA",
    date: "2026-05-13",
    time: "08:45",
  },
];