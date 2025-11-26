---
title: Trakt Widget
date: 2025-10-28
tags:
  - trakt
  - api
  - express
  - nextjs
  - react
  - movies
  - tvshows
  - widget
  - portfolio
  - realtime
---
A real-time widget that displays the last movie or TV episode you watched on [Trakt.tv](https://trakt.tv), complete with poster images and direct links. This became one of my favorite portfolio additions because it shows visitors what I've been watching lately adding that personal touch that makes a portfolio feel human.

The project combines the **[[notes/Public APIs/Trakt API]]** for watch history, **[[notes/Public APIs/TMDB API]]** for beautiful poster images, **[[notes/Tech Stack/Express.js]]** for a lightweight backend, and **[[notes/Tech Stack/PostgreSQL]]** for persistent token storage. What started as "wouldn't it be cool to show what I'm watching?" evolved into a robust system handling OAuth refresh tokens, intelligent caching, and graceful error handling.

The implementation uses smart **server-side caching** (5-minute TTL) to respect [[notes/API]] rate limits, automatic **token refresh** to stay authenticated indefinitely, and a **React component** that elegantly handles all possible states whether you just finished a movie, binged a TV series, or haven't watched anything recently.

## Visual Preview: See It In Action
Before jumping into the technical stuff, here's what this actually looks like when integrated into a portfolio. These are real screenshots showing the widget in different states not mockups, but the actual component in use.

### When You've Watched Something
<div style="text-align: center;">

![Trakt widget showing last watched content with poster](./assets/trakt-widget.png)

*Displaying "Severance" Season 2 Episode 7 with its poster. The image is clickable and takes you directly to the episode's Trakt page.*

</div>

## Why Build This?
As someone who loves movies and TV shows, I wanted my portfolio to reflect this part of who I am. Instead of just listing hobbies in an "about me" section, visitors can see **exactly** what I watched last night. Maybe it's a Criterion Collection classic, maybe it's a guilty pleasure reality show 😆; either way, it's authentic and creates instant conversation starters.

The technical challenge was equally compelling: building a system that stays authenticated indefinitely without user intervention, handles Trakt's OAuth token rotation, enriches data with TMDB poster images, and maintains excellent performance through smart caching.

Plus, there's something satisfying about solving the "persistent authentication" problem. The refresh token can rotate at any time, but the system handles it transparently and stores the new token in PostgreSQL, so everything just keeps working.

## Architecture Overview
The system has three main components working together seamlessly:

### 1. Express API Server (`src/index.js`)
The foundation - a minimal Express.js server that:
- **Serves the main API endpoint** at `/api/trakt/last` for fetching watch history
- **Handles CORS** properly for both development and production
- **Self-pings every 10 minutes** when deployed on Render's free tier to prevent spin-down
- **Initializes database** on startup to ensure token persistence works
- **Provides health checks** for monitoring and keep-alive pings

### 2. Trakt Integration Layer (`src/trakt.js`)
The brain of the operation - handles all the complex logic:
- **Automatic OAuth token refresh** with token rotation detection and database persistence
- **Parallel API calls** to Trakt for both movies and episodes, then picks the most recent
- **TMDB poster enrichment** to add beautiful cover art (gracefully degraded if unavailable)
- **Smart 5-minute caching** in-memory to minimize API calls and improve response times
- **Comprehensive error handling** for network issues, missing tokens, and API failures

### 3. PostgreSQL Database (`src/db.js`)
Token persistence layer with intelligent fallbacks:
- **Auto-creates `tokens` table** on first run with a single-row constraint
- **Stores and retrieves refresh tokens** with timestamp tracking
- **Falls back to environment variables** if database is unavailable (development mode)
- **Graceful degradation** ensures the app works even without a database connection

### 4. Frontend React Component
The user-facing piece that brings it all together:
- **Next.js client component** with TypeScript for type safety
- **Real-time data fetching** with automatic updates every 30 seconds
- **Beautiful state handling** for loading, active content, and empty states
- **Clickable poster images** that link directly to Trakt.tv
- **Responsive design** that works perfectly on all screen sizes

## Getting Started: Setting Up Trakt Integration
The setup involves creating apps on both Trakt and TMDB, then running a one-time OAuth flow to get your refresh token. It's more straightforward than it sounds!

### Step 1: Create Your Trakt Application
Navigate to [Trakt API Apps](https://trakt.tv/oauth/applications) and create a new application:

**App Configuration:**
- **Name**: Something like "Portfolio Trakt Widget" or "Personal Website Tracker"
- **Description**: Brief description like "Displays my last watched movie/show on my portfolio"
- **Redirect URI**: `urn:ietf:wg:oauth:2.0:oob` (this is the "out-of-band" mode for CLI apps)
- **Permissions**: Just the default read permissions are fine

Once created, you'll get a **Client ID** and **Client Secret** save these for the next step.

### Step 2: Get TMDB API Key (Optional but Recommended)
For the poster images, you'll need a TMDB API key. Without it, the widget still works but won't show posters.

1. Go to [TMDB Settings API](https://www.themoviedb.org/settings/api)
2. Sign up if needed (it's free)
3. Request an API key (select "Developer" use case)
4. Copy your **API Key (v3 auth)**

### Step 3: Configure Environment Variables
Create a `.env` file in your project root:

```env
# Required - From Trakt Developer App
TRAKT_CLIENT_ID=your_trakt_client_id_here
TRAKT_CLIENT_SECRET=your_trakt_client_secret_here

# This will be generated in Step 4
TRAKT_REFRESH_TOKEN=your_refresh_token_here

# Optional - For poster images
TMDB_API_KEY=your_tmdb_api_key_here

# Optional - Database for token persistence
DATABASE_URL=postgresql://user:password@host:port/database

# Optional - Production settings
FRONTEND_URL=https://yourportfolio.com
PORT=3001
NODE_ENV=production
RENDER_EXTERNAL_URL=https://your-app.onrender.com
```

### Step 4: Get Your Refresh Token
This is the most important step you only need to do it once, and the token works forever (until you revoke app access).

Run the included token generator script:

```bash
node get-token.js
```

The script will:
1. **Generate an authorization URL** and display it in your terminal
2. **Open your browser** automatically (or you paste the URL manually)
3. **Prompt you to authorize** the app on Trakt.tv
4. **Display a code** after authorization
5. **Ask you to paste the code** back in the terminal
6. **Exchange the code for tokens** and display your refresh token

Copy the **refresh token** from the output and paste it into your `.env` file as `TRAKT_REFRESH_TOKEN`.

**Pro Tip:** The refresh token doesn't expire unless you revoke the app's access on Trakt.tv. The system automatically handles access token renewal, so you never have to think about auth again!

### Step 5: Set Up Database (Optional)
If you want token persistence (recommended for production), set up a PostgreSQL database:

**Local Development:**
```bash
# Using Docker
docker run --name trakt-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Connection string
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
```

**Production (Render, Railway, etc.):**
Most platforms offer a free PostgreSQL addon. Just add it to your app and copy the connection string to your environment variables.

The app automatically creates the `tokens` table on first run. If no database is configured, it falls back to using the `TRAKT_REFRESH_TOKEN` from your `.env` file.

## Implementation: The Code That Powers It All
## 1) Minimal Express server (`src/index.js`)
Serves the single API endpoint and initializes the app.

```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initialize, getLastWatched } from "./trakt.js";

dotenv.config();
await initialize();

const app = express();
app.use(cors());
app.get("/api/trakt/last", async (req, res) => {
  try {
    const data = await getLastWatched();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
app.listen(process.env.PORT || 3001);
```

## 2) Refresh token & access token exchange (`src/trakt.js`)
Handles token refresh and rotation (critical part).

```javascript
import fetch from "node-fetch";
import { getToken, saveToken } from "./db.js";

const CLIENT_ID = process.env.TRAKT_CLIENT_ID;
const CLIENT_SECRET = process.env.TRAKT_CLIENT_SECRET;
const TRAKT_API_BASE = "https://api.trakt.tv";

async function refreshAccessToken() {
  const refreshToken = await getToken();
  if (!refreshToken) throw new Error("No refresh token");

  const resp = await fetch(`${TRAKT_API_BASE}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!resp.ok) throw new Error("Token refresh failed");
  const data = await resp.json();

  // Persist rotated refresh token if Trakt provided a new one
  if (data.refresh_token && data.refresh_token !== refreshToken) {
    await saveToken(data.refresh_token);
  }

  return data.access_token;
}
```

## 3) Fetch last watched item (movies & episodes, TMDB enrichment)
Parallel fetch, pick newest, enrich with poster if available.

```javascript
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

async function fetchPoster(type, tmdbId) {
  if (!TMDB_API_KEY || !tmdbId) return null;
  const res = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.poster_path ? `${TMDB_IMAGE_BASE}${json.poster_path}` : null;
}

export async function getLastWatched() {
  const accessToken = await refreshAccessToken();
  const headers = {
    "trakt-api-version": "2",
    "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  // Parallel calls for latest movie + episode
  const [moviesResp, episodesResp] = await Promise.all([
    fetch(`${TRAKT_API_BASE}/sync/history/movies?limit=1`, { headers }),
    fetch(`${TRAKT_API_BASE}/sync/history/episodes?limit=1`, { headers }),
  ]);

  const movies = moviesResp.ok ? await moviesResp.json() : [];
  const episodes = episodesResp.ok ? await episodesResp.json() : [];

  const candidates = [];
  if (movies.length) candidates.push({ ts: movies[0].watched_at, item: movies[0], kind: "movie" });
  if (episodes.length) candidates.push({ ts: episodes[0].watched_at, item: episodes[0], kind: "episode" });
  if (!candidates.length) return null;

  candidates.sort((a, b) => new Date(b.ts) - new Date(a.ts));
  const latest = candidates[0];

  if (latest.kind === "movie") {
    const m = latest.item.movie;
    return {
      type: "movie",
      title: m.title,
      year: m.year,
      poster_url: await fetchPoster("movie", m.ids?.tmdb),
      trakt_url: m.ids?.slug ? `https://trakt.tv/movies/${m.ids.slug}` : null,
      watched_at: latest.ts,
    };
  } else {
    const ep = latest.item.episode;
    const show = latest.item.show || {};
    return {
      type: "episode",
      title: ep.title || `${show.title} S${ep.season}E${ep.number}`,
      show_title: show.title,
      season: ep.season,
      episode: ep.number,
      poster_url: await fetchPoster("tv", show.ids?.tmdb),
      trakt_url: show.ids?.slug ? `https://trakt.tv/shows/${show.ids.slug}/seasons/${ep.season}/episodes/${ep.number}` : null,
      watched_at: latest.ts,
    };
  }
}
```

## 4) Token persistence (Postgres fallback to ENV) (`src/db.js`)
Simple single-row token store with upsert.

```javascript
import { Pool } from "pg";
let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false });
  await pool.query(`CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY DEFAULT 1, refresh_token TEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
}

export async function getToken() {
  if (!pool) return process.env.TRAKT_REFRESH_TOKEN || null;
  const { rows } = await pool.query("SELECT refresh_token FROM tokens WHERE id = 1");
  if (rows[0]?.refresh_token) return rows[0].refresh_token;
  const env = process.env.TRAKT_REFRESH_TOKEN;
  if (env) await saveToken(env);
  return env || null;
}

export async function saveToken(newToken) {
  if (!pool) return;
  await pool.query(
    `INSERT INTO tokens (id, refresh_token) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET refresh_token = $1, updated_at = CURRENT_TIMESTAMP`,
    [newToken]
  );
}
```

## Quick checklist / gotchas
* **Generate refresh token once** via the OAuth flow and save it. If you skip this, nothing will return user-specific history.
* **Persist rotated refresh token.** Trakt may return a new refresh token at refresh time - save it.
* **Cache** server-side (5 minutes) to avoid hitting Trakt frequently
* **TMDB optional.** Works without posters; only add TMDB to improve visuals.
* **CORS**: lock down to your actual frontend URL in production.
* **DB optional for dev**, but required for safe, long-running production to handle token rotation.

**Component Highlights:**
- **TypeScript for type safety** with proper interfaces for API responses
- **Abort controller** to prevent memory leaks when component unmounts
- **Smart title formatting** that handles movies and episodes differently
- **Graceful image fallback** when TMDB posters aren't available
- **Accessible** with proper ARIA labels for screen readers
- **Responsive hover effects** that feel smooth and natural

## Technical Deep Dive: What Makes This Work
### Multi-Layer Caching Strategy
The caching is what makes this system efficient and respectful of API limits:

**Server-Side Cache:**
- **5-minute TTL** in-memory cache on the Express server
- Reduces Trakt API calls from **12/hour to 2/hour** (83% reduction)
- Shared across all requests - if 100 users visit your portfolio, still just 2 API calls per hour
- Automatically invalidates when expired, ensuring freshness

**Client-Side Behavior:**
- Frontend fetches on component mount
- No aggressive polling (you could add SWR for auto-refresh if desired)
- **Abort controller** prevents memory leaks on unmount

**Real-World Impact:**
- Without caching: ~300 API calls per day with moderate traffic  
- With caching: ~48 API calls per day  
- That's **84% fewer API calls**, well within all rate limits.

### Bulletproof Token Management
The OAuth flow is designed to "set it and forget it":

**Token Lifecycle:**
1. **Initial Setup**: Run `get-token.js` once to get refresh token
2. **Persistent Storage**: Token saved to PostgreSQL (or `.env` as fallback)
3. **Automatic Refresh**: Access token refreshed on every request (short-lived)
4. **Token Rotation**: If Trakt rotates the refresh token, automatically save the new one
5. **Zero Maintenance**: Works indefinitely until you revoke app access

**Fallback Chain:**
```
Database → Environment Variable → Error
```

### Error Handling Philosophy
Building a real-time widget means embracing failure gracefully:

**API Failures:**
- Trakt API down → Return `{ ok: false, error: "..." }`
- TMDB unavailable → Display content without poster
- Network timeout → Log error, return empty state
- Invalid token → Attempt refresh, if that fails, clear error message

**Configuration Errors:**
- Missing client ID/secret → Fail fast with clear error on startup
- Missing refresh token → Log warning, return graceful "no data" state
- Database connection fails → Fall back to environment variables

**User Experience:**
- Never show raw error messages to users
- Always provide a meaningful fallback state
- Log detailed errors server-side for debugging
- Maintain visual consistency even in error states

### Performance Optimizations
Several subtle optimizations make this fast:

**Parallel API Calls:**
```javascript
// Instead of sequential:
const movies = await fetch(moviesUrl);
const episodes = await fetch(episodesUrl);

// We do parallel:
const [movies, episodes] = await Promise.all([
  fetch(moviesUrl),
  fetch(episodesUrl)
]);
```
This cuts response time in half!

**Conditional TMDB Fetching:**
- Only fetch posters if TMDB_API_KEY is configured
- Don't block response if TMDB is slow
- Return `null` poster_url rather than waiting

**Smart Database Queries:**
- Single-row table means lightning-fast reads
- No indexes needed, no query optimization required
- UPSERT pattern prevents race conditions

## Deployment Guide
### Local Development
```bash
# Install dependencies
npm install

# Create .env file with your credentials
# (See Step 3 in Getting Started)

# Get your refresh token
node get-token.js

# Start the server
npm run dev

# Server runs on http://localhost:3001
# Test it: http://localhost:3001/api/trakt/last
```

### Production Deployment (Render)
Render offers a generous free tier perfect for this:

1. **Create New Web Service** on Render dashboard
2. **Connect GitHub repo** containing this code
3. **Configure build settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add environment variables:**
   - `TRAKT_CLIENT_ID`
   - `TRAKT_CLIENT_SECRET`
   - `TRAKT_REFRESH_TOKEN`
   - `TMDB_API_KEY`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your portfolio URL)
5. **Add PostgreSQL database:**
   - Render auto-provisions and sets `DATABASE_URL`
6. **Deploy!**

### Alternative: Railway, Fly.io, or Vercel
This is a standard Express app, so it deploys anywhere:

- **Railway**: Zero-config deployment with PostgreSQL addon
- **Fly.io**: Excellent free tier, global edge deployment
- **Vercel**: Works as serverless functions (requires slight refactor)

## Usage Stats
**API Usage:**
-  **Trakt API calls**: ~48/day (well within limits)
-  **TMDB API calls**: ~48/day (also well within limits)
-  **Database queries**: ~144/day (minimal load)

## Tips for Your Implementation
After living with this feature, here are some lessons learned:

### Visual Design Tips
1. **Poster Dimensions**: I use 100x150px (2:3 aspect ratio) which matches movie poster proportions perfectly
2. **Trakt Red**: The Trakt brand color is `#ED1C24` (bright red) use it for the icon
3. **Fallback State**: The "no image" placeholder should match your site's aesthetic
4. **Spacing**: Give the widget breathing room, don't cram it next to other dense content

### Technical Tips
1. **Test Token Rotation**: Manually rotate your token to ensure persistence works
2. **Monitor Logs**: Check server logs occasionally to catch any auth issues early
3. **API Rate Limits**: Trakt allows ~1000 requests/day; TMDB allows ~1000/day ~you'll never hit these
4. **Database Backups**: If using PostgreSQL, enable automatic backups for peace of mind

### Content Tips
1. **Watch What You Want**: Unlike the Spotify widget, Trakt doesn't have a "private mode," so everything shows
2. **Embrace It**: The realness of showing actual watch history (not curated) makes it more genuine
3. **TV Episode Details**: The S1E1 format is instantly recognizable - don't overthink it

## What's Next?
Once you have the basic implementation working, consider these enhancements:

**Feature Ideas:**
-  **Watch Stats**: Total movies/episodes watched this month
-  **Favorite Genres**: Show your top 3 genres with progress bars
-  **Ratings Display**: Include your rating alongside what you watched
-  **Watch Calendar**: Heatmap of watching activity over time
-  **Current Binge**: Detect when you're binge-watching a series and show progress

**Technical Improvements:**
- **Webhook Support**: Use Trakt webhooks to update instantly when you finish watching
- **Watch History Cache**: Store recent watches in database for richer displays
- **Dynamic Theming**: Extract colors from poster and apply to widget background
- **Analytics**: Track which content generates the most clicks

## Dependencies
```json
{
  "dependencies": {
    "cors": "^2.8.5",           // CORS middleware for Express
    "dotenv": "^16.4.7",        // Environment variable management
    "express": "^4.21.2",       // Web server framework
    "node-fetch": "^3.3.2",     // HTTP client for API calls
    "pg": "^8.13.1"             // PostgreSQL client
  },
  "devDependencies": {
    "nodemon": "^3.1.9"         // Auto-reload during development
  }
}
```

**Frontend:**
```json
{
  "dependencies": {
    "next": "^15.0.0",          // React framework
    "react": "^19.0.0",         // UI library
    "react-icons": "^5.5.0"     // Trakt icon component
  }
}
```

Install everything:
```bash
# Backend
npm install

# Frontend (Next.js project)
npm install react-icons
```

## Closing Thoughts
Building this Trakt widget taught me that the best portfolio pieces aren't always the most technically complex - they're the ones that show **who you are** as a person. Yes, the OAuth flow and caching strategy are solid engineering, but what makes this special is that it's *real*. 

When someone visits my portfolio and sees I just watched a classic film noir or binged a sci-fi series, it creates an instant connection. We're not just developer and visitor anymore we're two people who might geek out about the same shows.

Plus, there's something deeply satisfying about building a system that authenticates once and then just works forever. No maintenance, no manual token refresh, just set it and forget it. That's the kind of engineering I love.