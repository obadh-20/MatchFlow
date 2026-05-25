# MatchFlow API Documentation

MatchFlow exposes a set of **Next.js API route handlers** that act as a Backend-for-Frontend (BFF) layer. These routes proxy requests to external football data APIs (RapidAPI and TheSportsDB), normalize responses into typed interfaces, and handle errors gracefully with mock data fallbacks.

---

## Base URL

All API routes are relative to your application's base URL:

```
http://localhost:3000/api
```

In production, replace with your deployed domain (e.g., `https://matchflow.vercel.app/api`).

---

## Conventions

### Authentication

- **RapidAPI routes** require the `X-RapidAPI-Key` header, which is automatically attached server-side via `process.env["X-RapidAPI-Key"]`.
- **TheSportsDB routes** use a free tier API key (`123`) embedded in the URL path. No additional authentication is needed.

### Error Handling Strategy

Routes that depend on RapidAPI use a three-tier fallback strategy:

| Condition | Behavior |
|---|---|
| `X-RapidAPI-Key` not set | Returns hardcoded mock data immediately |
| API returns 429 (quota exceeded) | Falls back to mock data for that request |
| Any other API error | Returns `{ error, message }` with HTTP 500 |

### Caching

- **Live matches** (`/api/live`): Cached server-side with `cacheLife({ stale: 10, revalidate: 60, expire: 120 })` — approximately 1 minute TTL.
- **Events** (`/api/events`): Cached server-side with `cacheLife({ stale: 3600, revalidate: 21600, expire: 86400 })` — approximately 1 day TTL.
- **All other routes**: No server-side caching. Data is fetched fresh on each request.

---

## Endpoints

---

### 1. Live Matches

**`GET /api/live`**

Returns currently live football matches.

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-current-live`

**Response `200 OK`:**
```json
[
  {
    "id": 12345,
    "date": "2026-05-25",
    "time": "14:00:00",
    "kickoff": "2026-05-25T14:00:00.000Z",
    "title": "Arsenal vs Chelsea",
    "league": "Premier League",
    "leagueBadgeUrl": "",
    "season": "",
    "homeTeam": "Arsenal",
    "awayTeam": "Chelsea",
    "homeScore": 2,
    "awayScore": 1,
    "round": 38,
    "homeTeamBadgeUrl": "",
    "awayTeamBadgeUrl": "",
    "venue": "",
    "status": "live",
    "thumbnailUrl": "",
    "liveTime": "63'"
  }
]
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch live matches",
  "message": "An error occurred while fetching live matches"
}
```

**Notes:**
- `liveTime` is only present for live matches and provides the elapsed time (e.g., `"63'"`).
- `homeTeamBadgeUrl` and `awayTeamBadgeUrl` are empty strings — the current RapidAPI response does not include badge URLs.
- Returns an empty array `[]` if no live matches are found or if the API key is not configured.

---

### 2. Events (Matches by Date)

**`GET /api/events?d=YYYYMMDD`**

Returns finished and upcoming matches. When no date parameter is provided, fetches matches for today ±1 day.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `d` | string | No | Today ±1 day | Date in `YYYYMMDD` format. If omitted or invalid, fetches yesterday, today, and tomorrow combined. |

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date`

**Response `200 OK`:**
```json
[
  {
    "id": 12345,
    "date": "2026-05-25",
    "time": "14:00:00",
    "kickoff": "2026-05-25T14:00:00.000Z",
    "title": "Arsenal vs Chelsea",
    "league": "Premier League",
    "leagueBadgeUrl": "",
    "season": "",
    "homeTeam": "Arsenal",
    "awayTeam": "Chelsea",
    "homeScore": 3,
    "awayScore": 1,
    "round": 38,
    "homeTeamBadgeUrl": "",
    "awayTeamBadgeUrl": "",
    "venue": "",
    "status": "finished",
    "thumbnailUrl": ""
  }
]
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch events",
  "message": "An error occurred while searching for events"
}
```

**Notes:**
- When fetching without a date, the API makes 3 parallel requests (yesterday, today, tomorrow) and deduplicates results by match ID.
- Matches are sorted by their kickoff timestamp (`timeTS`), ascending.

---

### 3. League Standings

**`GET /api/standings?League=EPL`**

Returns league standings for a specified competition.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `League` | string | No | `EPL` | League code. Valid values: `EPL`, `Laliga`, `Bundesliga`, `SerieA`, `Ligue1` |

**Source:** TheSportsDB — `thesportsdb.com/api/v1/json/123/lookuptable.php`

**Response `200 OK`:**
```json
[
  {
    "id": 9276382,
    "rank": 1,
    "teamId": 133604,
    "teamName": "Arsenal",
    "badgeUrl": "https://www.thesportsdb.com/images/teams/badge/133604.png",
    "leagueId": 4328,
    "leagueName": "English Premier League",
    "season": "2025-2026",
    "form": ["W", "W", "W", "W", "D"],
    "description": "Promotion - Champions League (League phase)",
    "played": 38,
    "won": 28,
    "lost": 3,
    "drawn": 7,
    "goalsFor": 89,
    "goalsAgainst": 29,
    "goalDifference": 60,
    "points": 91,
    "zone": "champions-league",
    "lastUpdated": "2026-05-25 12:00:00"
  }
]
```

**Response `400` (invalid league):**
```json
{
  "error": "Invalid league",
  "message": "Please provide a valid league query parameter. Valid values are: EPL, Laliga, Bundesliga, SerieA, Ligue1"
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch standings",
  "message": "An error occurred while fetching standings"
}
```

**Notes:**
- The `zone` field is computed from the `description` field. Possible values: `champions-league`, `europa-league`, `conference-league`, `relegation`, `mid-table`.
- The `form` field is an array of single-letter strings parsed from a string like `"WWWWD"` (W = Win, D = Draw, L = Loss).
- This endpoint uses TheSportsDB (not RapidAPI), so it has no mock data fallback.

---

### 4. Global Search

**`GET /api/search?q=query`**

Performs a unified search across players, teams, leagues, and matches.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `q` | string | Yes | — | Search query (case-insensitive). |

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-all-search`

**Response `200 OK` (empty query):**
```json
{
  "status": "success",
  "response": {
    "players": [],
    "teams": [],
    "leagues": [],
    "matches": []
  }
}
```

**Response `200 OK` (with results):**
```json
{
  "status": "success",
  "response": {
    "players": [
      {
        "id": 123,
        "name": "Bukayo Saka",
        "photo": "https://example.com/saka.jpg",
        "nationality": "England",
        "position": "Midfielder",
        "teamName": "Arsenal",
        "teamLogo": "https://example.com/arsenal.png"
      }
    ],
    "teams": [
      {
        "id": 456,
        "name": "Arsenal",
        "logo": "https://example.com/arsenal.png"
      }
    ],
    "leagues": [
      {
        "id": 47,
        "name": "Premier League",
        "logo": "https://example.com/epl.png",
        "country": "England",
        "flag": "https://example.com/eng.png"
      }
    ],
    "matches": [
      {
        "id": 789,
        "homeTeam": "Arsenal",
        "awayTeam": "Chelsea",
        "homeLogo": "https://example.com/arsenal.png",
        "awayLogo": "https://example.com/chelsea.png",
        "leagueName": "Premier League",
        "time": "2026-05-25T14:00:00.000Z",
        "status": "Live"
      }
    ]
  }
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to perform search"
}
```

**Notes:**
- When the API key is missing or quota is exceeded (429), the route filters built-in mock data by the query string.
- Players, teams, leagues, and matches are each limited to 5 results in the UI dropdown.

---

### 5. Top Leagues

**`GET /api/top-leagues`**

Returns a list of popular football leagues.

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-popular-leagues`

**Response `200 OK`:**
```json
{
  "status": "success",
  "response": {
    "leagues": [
      {
        "id": 47,
        "name": "Premier League",
        "country": "England",
        "logo": "https://example.com/epl.png",
        "flag": "https://example.com/eng.png",
        "season": "2025",
        "seasonName": "2025/2026",
        "seasonSlug": "2025-2026"
      }
    ]
  }
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch top leagues"
}
```

---

### 6. Top Transfers

**`GET /api/top-transfers`**

Returns a list of top football transfers.

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-get-top-transfers`

**Response `200 OK`:**
```json
{
  "status": "success",
  "response": {
    "transfers": [
      {
        "id": 1,
        "player_name": "Kylian Mbappé",
        "age": "26",
        "date": "2026-06-01",
        "from_club": {
          "id": 85,
          "name": "Paris Saint-Germain",
          "logo": "https://example.com/psg.png"
        },
        "to_club": {
          "id": 86,
          "name": "Real Madrid",
          "logo": "https://example.com/realmadrid.png"
        },
        "fee": "€150M",
        "market_value": "€180M",
        "position": "Forward",
        "nationality": "France",
        "photo": "https://example.com/mbappe.jpg",
        "league": "La Liga",
        "season": "2026/2027"
      }
    ]
  }
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch top transfers"
}
```

---

### 7. Trending News

**`GET /api/trending-news`**

Returns trending football news articles.

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-get-trendingnews`

**Response `200 OK`:**
```json
{
  "status": "success",
  "response": {
    "news": [
      {
        "id": 1,
        "title": "Arsenal Clinch Premier League Title",
        "description": "Arsenal have secured the Premier League title with a convincing 3-0 victory...",
        "url": "https://example.com/article",
        "image": "https://example.com/image.jpg",
        "source": "BBC Sport",
        "date": "2026-05-25",
        "time": "10:30:00"
      }
    ]
  }
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch trending news"
}
```

---

### 8. League Detail

**`GET /api/league/:id`**

Returns detailed league information including standings table and top scorers.

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Numeric league ID (e.g., `47` for Premier League) |

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-get-league-detail`

**Response `200 OK`:**
```json
{
  "status": "success",
  "response": {
    "detail": {
      "id": 47,
      "name": "Premier League",
      "country": "England",
      "logo": "https://example.com/epl.png",
      "flag": "https://example.com/eng.png",
      "seasonName": "2025/2026",
      "seasonSlug": "2025-2026",
      "teams": [
        {
          "id": 133604,
          "name": "Arsenal",
          "logo": "https://example.com/arsenal.png",
          "position": 1,
          "points": 91,
          "played": 38,
          "won": 28,
          "drawn": 7,
          "lost": 3,
          "goalsFor": 89,
          "goalsAgainst": 29,
          "goalDifference": 60
        }
      ],
      "topScorers": [
        {
          "id": 1,
          "playerName": "Erling Haaland",
          "teamName": "Manchester City",
          "teamLogo": "https://example.com/mancity.png",
          "goals": 32,
          "nationality": "Norway",
          "photo": "https://example.com/haaland.jpg"
        }
      ]
    }
  }
}
```

**Response `400` (invalid ID):**
```json
{
  "error": "Invalid league ID"
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch league details"
}
```

---

### 9. Player Detail

**`GET /api/player/:id`**

Returns detailed player profile information.

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Numeric player ID |

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-get-player-detail`

**Response `200 OK`:**
```json
{
  "status": "success",
  "response": {
    "profile": {
      "id": 1,
      "name": "Bukayo Saka",
      "position": "Right Winger",
      "teamName": "Arsenal",
      "leagueName": "Premier League",
      "nationality": "England",
      "age": 24,
      "height": "178 cm",
      "weight": "70 kg",
      "preferredFoot": "Left",
      "dateOfBirth": "2001-09-05",
      "contractStart": "2023-01-01",
      "contractEnd": "2028-06-30",
      "estimatedValue": "€120M",
      "thumbUrl": "https://example.com/saka.jpg",
      "cutoutUrl": "https://example.com/saka-cutout.png"
    },
    "statSummary": { "appearances": 42, "goals": 18, "assists": 14 },
    "ratingTrend": [
      { "date": "2022-2023", "rating": 7.5 },
      { "date": "2023-2024", "rating": 8.0 },
      { "date": "2024-2025", "rating": 8.2 },
      { "date": "2025-2026", "rating": 8.5 }
    ],
    "attributes": [
      { "label": "Pace", "value": 85 },
      { "label": "Shooting", "value": 78 },
      { "label": "Passing", "value": 82 },
      { "label": "Defending", "value": 45 },
      { "label": "Dribbling", "value": 88 },
      { "label": "Physical", "value": 68 }
    ],
    "career": [
      { "season": "2022-2023", "team": "Arsenal", "appearances": 38, "goals": 14, "assists": 11, "rating": 7.5 }
    ],
    "awards": [
      { "title": "PFA Young Player of the Year", "subtitle": "2023-2024" }
    ],
    "similarPlayers": [
      { "id": 2, "name": "Phil Foden", "team": "Manchester City", "rating": 8.3, "thumbUrl": "..." }
    ]
  }
}
```

**Response `400` (invalid ID):**
```json
{
  "error": "Invalid player ID"
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch player details"
}
```

**Notes:**
- On API failure (including 429), the route returns **mock data** unconditionally to ensure the player profile UI always works.
- The mock data contains comprehensive sample data for all sub-sections (profile, stats, attributes, career, awards, similar players).

---

### 10. Match Detail (RapidAPI)

**`GET /api/match/:id`**

Returns basic match detail information.

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Numeric match ID (event ID) |

**Source:** RapidAPI — `free-api-live-football-data.p.rapidapi.com/football-get-match-detail`

**Response `200 OK`:**
```json
{
  "matchId": "1896627",
  "matchName": "Arsenal vs Chelsea",
  "matchRound": "38",
  "teamColors": {
    "darkMode": { "home": "#EF0107", "away": "#034694" },
    "lightMode": { "home": "#EF0107", "away": "#034694" },
    "fontDarkMode": { "home": "#FFFFFF", "away": "#FFFFFF" },
    "fontLightMode": { "home": "#FFFFFF", "away": "#FFFFFF" }
  },
  "leagueId": 47,
  "leagueName": "Premier League",
  "leagueRoundName": "Matchday 38",
  "parentLeagueId": 0,
  "countryCode": "ENG",
  "homeTeam": { "name": "Arsenal", "id": 133604 },
  "awayTeam": { "name": "Chelsea", "id": 133605 },
  "coverageLevel": "basic",
  "matchTimeUTC": "2026-05-25T14:00:00.000Z",
  "matchTimeUTCDate": "2026-05-25T14:00:00.000Z",
  "started": true,
  "finished": false,
  "gender": "male"
}
```

**Response `400` (invalid ID):**
```json
{
  "error": "Invalid match ID"
}
```

**Response `404` (not found):**
```json
{
  "error": "Match not found"
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch match details",
  "message": "An error occurred while fetching match details"
}
```

---

### 11. Match Detail (Mock / Rich Visualization)

**`GET /api/match`**

Returns a rich set of mock match detail data used for the detailed match visualization page (pitch formation, stats, timeline, player ratings, momentum chart).

**Response `200 OK`:**
```json
{
  "response": {
    "header": {
      "leagueName": "Premier League",
      "leagueBadgeUrl": "",
      "status": "live",
      "homeTeam": "Arsenal",
      "awayTeam": "Chelsea",
      "homeTeamBadgeUrl": "...",
      "awayTeamBadgeUrl": "...",
      "homeScore": 2,
      "awayScore": 1,
      "stadium": "Emirates Stadium",
      "attendance": "60,704",
      "referee": "Michael Oliver",
      "var": "Stuart Attwell",
      "liveTime": "63'"
    },
    "homeFormation": { "formation": "4-3-3", "players": [...] },
    "awayFormation": { "formation": "4-2-3-1", "players": [...] },
    "stats": [
      { "label": "Possession", "home": 58, "away": 42 },
      { "label": "Total Shots", "home": 14, "away": 8 },
      { "label": "Corners", "home": 6, "away": 3 },
      { "label": "Fouls", "home": 10, "away": 12 }
    ],
    "momentum": [
      { "minute": 10, "homeValue": 0.6, "awayValue": 0.4 },
      { "minute": 20, "homeValue": 0.7, "awayValue": 0.3 }
    ],
    "timeline": [
      {
        "id": "1",
        "minute": 23,
        "player": "Martin Ødegaard",
        "team": "home",
        "type": "goal",
        "assist": "Bukayo Saka",
        "scoreHome": 1,
        "scoreAway": 0
      }
    ],
    "players": [
      {
        "id": 1,
        "name": "David Raya",
        "team": "home",
        "rating": 7.2,
        "goals": 0,
        "assists": 0,
        "shots": 0,
        "passes": 32,
        "tackles": 0
      }
    ]
  }
}
```

**Notes:**
- This route returns **static mock data only** — it does not call any external API.
- Used exclusively by the `/match` page for the rich visualization demo.

---

### 12. Team Search

**`GET /api/teams?t=name`**

Search for football teams by name.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `t` | string | Yes | — | Team name search term |

**Source:** TheSportsDB — `thesportsdb.com/api/v1/json/123/searchteams.php`

**Response `200 OK` (with results):**
```json
[
  {
    "id": 133604,
    "name": "Arsenal",
    "shortName": "Arsenal",
    "alternateName": "Arsenal FC",
    "leagueName": "English Premier League",
    "leagueId": 4328,
    "location": "London, England",
    "description": "Arsenal Football Club is a professional football club...",
    "badgeUrl": "https://www.thesportsdb.com/images/teams/badge/133604.png",
    "keywords": ["Gunners", "AFC"]
  }
]
```

**Response `200 OK` (no results):**
```json
[]
```

**Response `400` (missing search term):**
```json
{
  "error": "Search term is required",
  "message": "Please provide a 't' query parameter with the team name to search for"
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch teams",
  "message": "An error occurred while searching for teams"
}
```

**Notes:**
- This endpoint uses TheSportsDB (not RapidAPI), so no mock data fallback is available.
- Returns normalized Team objects.

---

### 13. Player Search

**`GET /api/players?t=name`**

Search for football players by name.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `t` | string | Yes | — | Player name search term |

**Source:** TheSportsDB — `thesportsdb.com/api/v1/json/123/searchplayers.php`

**Response `200 OK` (with results):**
```json
{
  "id": 34145575,
  "teamId": 133604,
  "name": "Bukayo Saka",
  "teamName": "Arsenal",
  "sport": "Soccer",
  "thumbUrl": "https://www.thesportsdb.com/images/players/thumb/34145575.png",
  "cutoutUrl": "",
  "nationality": "England",
  "dateOfBirth": "2001-09-05",
  "isActive": true,
  "position": "Midfielder"
}
```

**Response `200 OK` (no results):**
```json
[]
```

**Response `400` (missing search term):**
```json
{
  "error": "Search term is required",
  "message": "Please provide a 't' query parameter with the player name to search for"
}
```

**Response `500` (API error):**
```json
{
  "error": "Failed to fetch players",
  "message": "An error occurred while searching for players"
}
```

**Notes:**
- This endpoint returns a **single normalized Player object** (the first match), not an array.
- This endpoint uses TheSportsDB (not RapidAPI), so no mock data fallback is available.

---

## Domain Types

### Match

```typescript
interface Match {
  id: number;
  date: string;           // "2026-04-05"
  time: string;           // "14:00:00"
  kickoff: string;        // ISO timestamp
  title: string;          // "Arsenal vs Chelsea"
  league: string;
  leagueBadgeUrl: string;
  season: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  round: number;
  homeTeamBadgeUrl: string;
  awayTeamBadgeUrl: string;
  venue: string;
  status: "upcoming" | "live" | "finished" | "postponed";
  thumbnailUrl: string;
  liveTime?: string;      // Only for live matches
}
```

### Standing

```typescript
interface Standing {
  id: number;
  rank: number;
  teamId: number;
  teamName: string;
  badgeUrl: string;
  leagueId: number;
  leagueName: string;
  season: string;
  form: string[];         // ["W","W","W","W","D"]
  description: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  zone: "champions-league" | "europa-league" | "conference-league" | "relegation" | "mid-table";
  lastUpdated: string;
}
```

### League

```typescript
interface League {
  id: number;
  key: "epl" | "laliga";
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
```

### Team

```typescript
interface Team {
  id: number;
  name: string;
  shortName: string;
  alternateName: string;
  leagueName: string;
  leagueId: number;
  location: string;
  description: string;
  badgeUrl: string;
  keywords: string[];
}
```

### Player

```typescript
interface Player {
  id: number;
  teamId: number;
  name: string;
  teamName: string;
  sport: string;
  thumbUrl: string;
  cutoutUrl: string;
  nationality: string;
  dateOfBirth: string;
  isActive: boolean;
  position: string;
}
```

---

## HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | Success — data returned |
| `400` | Bad request — missing or invalid parameters |
| `404` | Resource not found |
| `500` | Internal server error — API failure or unexpected error |

---

## Rate Limiting

External API rate limits apply:

- **RapidAPI (Free Live Football Data):** Varies by subscription plan. The free tier typically allows ~100 requests/day. Routes automatically fall back to mock data when the 429 status code is detected.
- **TheSportsDB:** The free tier key (`123`) has no documented rate limits but may throttle under heavy usage.