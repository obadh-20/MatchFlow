# MatchFlow — Real-time Football Dashboard

> **Live scores, match results, league standings, player stats, and trending football news — all in one place.**

MatchFlow is a real-time football (soccer) dashboard built with Next.js 16 and React 19. It aggregates data from multiple public APIs to deliver live match updates, league standings, player profiles, transfer news, and trending football headlines. The application features a responsive design, server-side caching, and graceful fallback to mock data when API quotas are exceeded.

---

## Features

### Live Matches
- **Real-time live match scores** fetched from RapidAPI, displayed in a horizontal carousel with active match timing
- Auto-refresh enabled via short-lived server cache (60-second revalidation)
- Each match card shows league, teams, score, and live time with a pulsing "LIVE" badge

### Match Results & Events
- **Finished match results** displayed in a responsive grid
- Fetch matches by date with automatic 3-day window (yesterday → today → tomorrow) to catch all events
- Status badges: `LIVE`, `FINAL`, `UPCOMING`, `POSTPONED`

### League Standings
- Full league standings table for **EPL, La Liga, Bundesliga, Serie A, and Ligue 1**
- Detailed statistics per team: played, won, drawn, lost, goals for/against, goal difference, points
- Zone classification (Champions League, Europa League, Conference League, Relegation)

### League Detail Pages
- Per-league detail view with standings table and top scorers list
- League header with logo, country flag, and season name

### Team Search
- Search for football teams by name via TheSportsDB API
- Displays team badge, name, league, and location

### Top Transfers
- Browse top football transfers with player info, source/destination clubs, transfer fee, and market value
- Graceful fallback to mock data when API quota is exceeded

### Player Profiles
- Comprehensive player detail page with:
  - Profile card (photo, name, position, team, nationality, age, physical stats, contract info, estimated value)
  - Stat summary (appearances, goals, assists)
  - Attribute radar (pace, shooting, passing, defending, dribbling, physical)
  - Performance trend chart over recent seasons
  - Career breakdown table
  - Awards list
  - Similar players grid
  - Performance trend chart (lazy-loaded Recharts component)

### Match Detail (Mock)
- Rich match detail visualization with:
  - Match header card (score, teams, stadium, referee, attendance, VAR)
  - Pitch formation visual (home and away team lineups)
  - Stats comparison (possession, shots, corners, fouls, etc.)
  - Attack momentum chart (Recharts, lazy-loaded)
  - Match timeline (goals, cards, substitutions)
  - Player performance ratings table

### Match Detail (Live Data)
- Dynamic match detail fetched by ID from RapidAPI
- Shows league, teams, status, date/time, round, country, coverage level

### Global Search
- Unified search across players, teams, leagues, and matches
- Debounced input (300ms) with dropdown results
- Results grouped by category with icons and navigation links

### Trending News
- Grid of trending football news articles from RapidAPI
- Each card shows image, source badge, title, description, date, and external link

### Newsletter Signup (UI only)
- Newsletter subscription banner on the home page (UI/interaction only — no backend integration)

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) 16.2.2 (App Router) |
| **UI Library** | [React](https://react.dev/) 19.2.4 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5.x (strict mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4, `tw-animate-css`, `class-variance-authority`, `tailwind-merge` |
| **Component Library** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **HTTP Client** | [Axios](https://axios-http.com/) 1.15 |
| **Charts** | [Recharts](https://recharts.org/) 3.8.1 (lazy-loaded) |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com/) 8.6.0 |
| **Icons** | [Lucide React](https://lucide.dev/) 1.8.0 |
| **Table Utilities** | [@tanstack/react-table](https://tanstack.com/table) 8.21.3 |
| **Font** | [Poppins](https://fonts.google.com/specimen/Poppins) (via Next.js font optimization) |
| **Package Manager** | [pnpm](https://pnpm.io/) |
| **Bundle Analysis** | [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) |

### External APIs

| API | Base URL | Purpose |
|---|---|---|
| **RapidAPI — Free Live Football Data** | `https://free-api-live-football-data.p.rapidapi.com` | Live matches, events, leagues, transfers, news, search, player/match/league details |
| **TheSportsDB** | `https://www.thesportsdb.com/api/v1/json/123` | Standings, teams, players |

---

## Installation

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x (recommended) or npm
- A **RapidAPI key** for the Free Live Football Data API (optional — app works with mock data)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/obadh-20/MatchFlow.git
cd real-time-football

# 2. Install dependencies
pnpm install

# 3. Create environment file
cp .env.example .env.local
# Edit .env.local and add your RapidAPI key (see Environment Variables below)

# 4. Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

---

## Production Build

```bash
# Build for production
pnpm build

# Start the production server
pnpm start
```

The production server will run at `http://localhost:3000`.

### Bundle Analysis

```bash
# Analyze client bundle
pnpm analyze:browser

# Analyze server bundle
pnpm analyze:server

# Analyze both
pnpm analyze
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `X-RapidAPI-Key` | No* | Your RapidAPI key for the [Free Live Football Data](https://rapidapi.com/neetechs-free-api-neetechs/api/free-api-live-football-data) API. If not set, the application falls back to built-in mock data. |

*\*The application is fully functional without this key — all API routes have mock data fallbacks.*

Create a `.env.local` file in the project root:

```env
X-RapidAPI-Key=your-rapidapi-key-here
```

---

## Folder Structure

```text
real-time-football/
├── app/                          # Next.js App Router pages & API routes
│   ├── api/                      # API route handlers (backend proxies)
│   │   ├── events/               # GET /api/events — Match events by date
│   │   ├── league/[id]/          # GET /api/league/:id — League detail
│   │   ├── live/                 # GET /api/live — Live matches
│   │   ├── match/                # GET /api/match — Mock match detail
│   │   │   └── [id]/             # GET /api/match/:id — Match detail (RapidAPI)
│   │   ├── player/[id]/          # GET /api/player/:id — Player detail
│   │   ├── players/              # GET /api/players?t= — Player search
│   │   ├── search/               # GET /api/search?q= — Global search
│   │   ├── standings/            # GET /api/standings?League= — League standings
│   │   ├── teams/                # GET /api/teams?t= — Team search
│   │   ├── top-leagues/          # GET /api/top-leagues — Popular leagues
│   │   ├── top-transfers/        # GET /api/top-transfers — Top transfers
│   │   └── trending-news/        # GET /api/trending-news — Trending news
│   ├── league/[id]/              # League detail page
│   ├── leagues/                  # Top leagues listing page
│   ├── match/                    # Mock match detail page
│   │   └── [id]/                 # Dynamic match detail page
│   ├── news/                     # Trending news page
│   ├── player/[id]/              # Player profile page
│   ├── players/                  # Top transfers page
│   ├── teams/                    # Team search page
│   ├── layout.tsx                # Root layout with Navbar + Poppins font
│   ├── page.tsx                  # Home page (Live matches + Results)
│   └── globals.css               # Global styles and Tailwind imports
│
├── components/                   # React components
│   ├── Navbar.tsx                # Navigation bar with global search
│   ├── Matches.tsx               # Live matches carousel
│   ├── MatchResult.tsx           # Match results + sidebar (trending teams, standings, newsletter)
│   ├── leagues/
│   │   └── LeagueCard.tsx        # League card for the grid
│   ├── match-detail/             # Match detail subcomponents
│   │   ├── AttackMomentumChart.tsx
│   │   ├── Footer.tsx
│   │   ├── MatchHeaderCard.tsx
│   │   ├── MatchTimeline.tsx
│   │   ├── PitchFormation.tsx
│   │   ├── PlayerMarker.tsx
│   │   ├── PlayerTable.tsx
│   │   ├── SectionCard.tsx
│   │   ├── StatBar.tsx
│   │   ├── StatsComparison.tsx
│   │   └── TimelineEvent.tsx
│   ├── player-page/              # Player profile subcomponents
│   │   ├── AttributesCard.tsx
│   │   ├── AwardsListCard.tsx
│   │   ├── CareerBreakdownTable.tsx
│   │   ├── PerformanceTrendChart.tsx
│   │   ├── PlayerHeroCard.tsx
│   │   ├── PlayerInfoCard.tsx
│   │   └── SimilarPlayersGrid.tsx
│   ├── top-transfers/
│   │   ├── TopTransfersPage.tsx
│   │   └── TransferCard.tsx
│   ├── trending-news/
│   │   └── NewsCard.tsx
│   └── ui/                       # shadcn/ui primitives
│       ├── button.tsx
│       └── sheet.tsx
│
├── lib/                          # Utility libraries and data fetching
│   ├── football-data.ts          # Cached data-fetching functions (use cache directive)
│   ├── normalizers.ts            # API response normalizers (TheSportsDB → domain types)
│   ├── player-types.ts           # TypeScript interfaces for player page
│   ├── utils.ts                  # Utility function (cn — class name merger)
│   ├── mock-league-detail.ts     # Mock data for league detail
│   ├── mock-match-data.ts        # Mock data for match detail
│   ├── mock-popular-leagues.ts   # Mock data for popular leagues
│   ├── mock-search-results.ts    # Mock data for search
│   ├── mock-top-transfers.ts     # Mock data for top transfers
│   ├── mock-trending-news.ts     # Mock data for trending news
│   └── mockPlayerData.ts         # Mock data for player profiles
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Domain types (Match, Team, Player, Standing, League)
│   ├── api.ts                    # API response types (both RapidAPI & TheSportsDB)
│   └── match-detail.ts           # Match detail page types
│
├── public/
│   └── Logo.png                  # Application logo
│
├── next.config.ts                # Next.js configuration (images, bundle optimization)
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies and scripts
├── pnpm-lock.yaml                # Dependency lock file
├── postcss.config.mjs            # PostCSS configuration (Tailwind v4)
├── components.json               # shadcn/ui configuration
├── DESIGN.md                     # Design system documentation (The Verge-inspired)
├── AGENTS.md                     # AI agent instructions
├── eslint.config.mjs             # ESLint configuration
└── CLAUDE.md                     # Claude AI configuration
```

---

## API Documentation

MatchFlow uses Next.js API route handlers as a **backend-for-frontend (BFF) layer** that proxies external APIs, normalizes responses, and handles errors with mock data fallbacks.

### All API Endpoints

| Method | Endpoint | Description | Source |
|---|---|---|---|
| `GET` | `/api/live` | Live matches (cached ~1 min) | RapidAPI |
| `GET` | `/api/events?d=YYYYMMDD` | Match events by date (cached ~1 day) | RapidAPI |
| `GET` | `/api/standings?League=EPL` | League standings | TheSportsDB |
| `GET` | `/api/search?q=query` | Global search (players, teams, leagues, matches) | RapidAPI |
| `GET` | `/api/top-leagues` | Popular leagues | RapidAPI |
| `GET` | `/api/top-transfers` | Top transfers | RapidAPI |
| `GET` | `/api/trending-news` | Trending football news | RapidAPI |
| `GET` | `/api/league/:id` | League detail with standings & top scorers | RapidAPI |
| `GET` | `/api/player/:id` | Player detail profile | RapidAPI |
| `GET` | `/api/match/:id` | Match detail | RapidAPI |
| `GET` | `/api/match` | Mock match detail (rich visualization data) | Mock |
| `GET` | `/api/teams?t=name` | Search teams by name | TheSportsDB |
| `GET` | `/api/players?t=name` | Search players by name | TheSportsDB |

For detailed request/response schemas and error codes, see [API.md](./API.md).

---

## Architecture Overview

### Data Flow

```text
User Browser
    │
    ▼
Next.js Page (React Client Component)
    │
    ├── useEffect → fetch(/api/...)         ← Client-side data fetching
    │       │
    │       ▼
    │   Next.js API Route (BFF Layer)
    │       │
    │       ├── Axios → RapidAPI / TheSportsDB API
    │       │       │
    │       │       ├── Success → Normalize → Return JSON
    │       │       └── Failure → Fallback to mock data → Return JSON
    │       │
    │       └── Return JSON response
    │
    └── Renders components with data
```

### Key Architectural Decisions

1. **Backend-for-Frontend (BFF) Pattern**: All external API calls are made through Next.js API routes, not directly from the browser. This keeps API keys server-side and provides a normalization layer.

2. **Dual Caching Strategy**:
   - **Server-side cache** (`"use cache"` directive): Used for live matches (~1 min TTL) and events (~1 day TTL) via Next.js `cacheLife` and `cacheTag`.
   - **No client cache**: Pages fetch fresh data on each mount via `useEffect`. No React Query, SWR, or client-side caching is used.

3. **Resilient Error Handling**: Every API route that depends on RapidAPI implements a three-tier fallback:
   - API key missing → mock data
   - API quota exceeded (429) → mock data
   - Any other error → error JSON response with 500 status

4. **Normalization Layer**: TheSportsDB responses (which use string-based IDs and inconsistent naming) are normalized to typed domain interfaces via `lib/normalizers.ts`.

5. **Lazy Loading for Heavy Libraries**: Recharts (~500KB) is dynamically imported with `next/dynamic({ ssr: false })` on both the match detail and player profile pages to avoid blocking the initial page load.

6. **No Global State**: The application uses local component state (`useState` + `useEffect`) exclusively. There is no Redux, Zustand, or Context API for global state management.

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard
vercel env add X-RapidAPI-Key
```

The project is optimized for Vercel deployment with Next.js 16. The `"use cache"` directive requires a Vercel deployment or a Node.js runtime that supports the Next.js cache layer.

### Other Platforms

1. Build the application: `pnpm build`
2. Start with Node.js: `pnpm start` (runs on port 3000 by default)
3. Set the `X-RapidAPI-Key` environment variable in your hosting environment

---

## Known Limitations

1. **No Authentication**: The application has no user accounts, authentication, or session management.
2. **No Database**: All data comes from external APIs. No persistent storage. Newsletter signup has no backend integration.
3. **No Real-time WebSockets**: "Live" matches are polled via HTTP with a ~1-minute cache delay, not pushed via WebSockets or SSE.
4. **No Client-side Caching**: Every page re-fetches data on mount. No React Query/SWR for deduplication or stale-while-revalidate.
5. **Mock Data Staleness**: Mock data files contain hardcoded values that will become outdated (e.g., transfers, news, player stats).
6. **Team Badge URLs**: The current RapidAPI live match integration does not return team badge URLs, so badges are missing on live match cards.
7. **Limited Test Coverage**: There are no unit tests, integration tests, or end-to-end tests.
8. **Single API Key Dependency**: The RapidAPI key is shared across all endpoints — a single quota exhaustion affects all features simultaneously.

---

## Future Improvements

### Performance
- Implement React Query/SWR for client-side caching, deduplication, and background refetching
- Add ISR (Incremental Static Regeneration) for league standings and news pages
- Prefetch match data during idle time using `next/preload`
- Implement virtual scrolling for long standings tables
- Add image blur placeholders for team badges and player photos

### Maintainability
- Add a monorepo structure separating API types, UI components, and shared utilities
- Create custom React hooks for data fetching (`useLiveMatches`, `useStandings`, `useSearch`, etc.)
- Centralize API error handling with an error boundary component
- Add automated API contract testing (e.g., Zod schemas for API responses)
- Generate TypeScript types from OpenAPI specs if available

### Scalability
- Implement WebSocket connections for true real-time live match updates
- Add request rate limiting and caching proxies for API quota management
- Introduce a Redis or in-memory cache layer between the BFF and external APIs
- Implement pagination for match results and news articles
- Add CDN caching for static assets and pre-rendered pages

### Developer Experience
- Add comprehensive unit tests with Vitest and React Testing Library
- Add end-to-end tests with Playwright or Cypress
- Set up Storybook for component development and documentation
- Add CI/CD pipeline with GitHub Actions (lint, type-check, test, build)
- Implement hot module replacement-friendly development patterns
- Add Sentry or similar error tracking for production monitoring

### Feature Enhancements
- Add match filtering by league, date range, and team
- Implement head-to-head comparison between teams
- Add push notifications for live match events
- Create a "My Teams" feature for personalized follow lists
- Add multi-language support (i18n)
- Implement dark mode (the DESIGN.md file already specifies a dark theme)
- Add live match commentary feed
- Build an admin dashboard for managing mock data and API configuration

---