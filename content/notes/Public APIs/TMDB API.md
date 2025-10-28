---
title: TMDB API
date: 2025-10-27
tags: [api, movies, tmdb, web, notes]
---
**The Movie Database (TMDB) API** provides rich metadata for movies, TV shows, people, and images; ideal for powering posters, details, search, and enrichment in apps and portfolio widgets. Official docs / getting started: [TMDB Developer – Getting Started](https://developer.themoviedb.org/docs/getting-started).

## Key Features & Capabilities
* Access movie, TV, and person metadata (titles, overviews, release dates, credits, genres).
* Search endpoints for movies, TV shows, and people.
* Image endpoints and configuration for building poster/backdrop URLs (TMDB supplies image base paths & sizes via the configuration API).
* Session & authentication types: [[notes/API]] key (v3), user authentication, and guest sessions for specific write actions (ratings, lists).
* Two API surface versions exist (v3 and v4) — use the version appropriate for the features you need.

## Authentication & Authorization
TMDB primarily uses an **API key** model for server-to-server requests (v3). For user-related actions (write: rate, favorite, lists) you can use guest sessions or full user authentication flows. Read the Authentication section in the docs for details.

**Common approaches**

* `api_key` query param (v3) for public/read requests.
* Guest sessions for anonymous user writes (no account sign-in).
* OAuth / user auth flows for account-scoped operations (v4 or user auth endpoints).

## Typical Request Structure & Base URLs
* **Base (v3):** `https://api.themoviedb.org/3/`
* **Common endpoints**

  * `GET /movie/{movie_id}` — movie details.
  * `GET /tv/{tv_id}` — TV show details.
  * `GET /person/{person_id}` — person (actor, director).
  * `GET /search/movie` — search movies.
  * `GET /configuration` — returns base image URL and available sizes (useful to construct poster/backdrop URLs). ([The Movie Database (TMDB)][1])

**Headers / params**
* Many requests accept `language` and `region` query params. Images are returned as paths — prepend the image base URL from the configuration endpoint to construct full image URLs. ([The Movie Database (TMDB)][1])

## Rate Limits & Policies
TMDB enforces rate limiting; check the docs for the current limits and best practices. Respect caching and avoid unnecessary repeated requests (cache configuration & popular responses). ([The Movie Database (TMDB)][1])

## Use Cases & Integration
* Enrich a Trakt or personal watch widget with high-quality poster images and metadata.
* Build search and discovery UIs (autocomplete search boxes, trending lists).
* Display cast and crew info for portfolio projects (e.g., “used TMDB to power movie detail pages”).
* Use `configuration` once at app startup to determine supported image sizes and base URL for cacheable poster requests. ([The Movie Database (TMDB)][1])

## Example: Get Movie Details
Request:

```http
GET https://api.themoviedb.org/3/movie/550?api_key={TMDB_API_KEY}&language=en-US
```

Simplified sample response:

```json
{
  "id": 550,
  "title": "Fight Club",
  "release_date": "1999-10-15",
  "overview": "A depressed man (Edward Norton) ...",
  "genres": [{ "id": 18, "name": "Drama" }],
  "poster_path": "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg"
}
```

## Advantages & Limitations
**Advantages**

* Comprehensive, community-backed dataset for movies/TV/people.
* Robust search and metadata ideal for UI enrichment and portfolio displays.
* Configuration API gives reliable image base paths & sizes to avoid hardcoding. ([The Movie Database (TMDB)][1])

**Limitations**

* You must follow TMDB’s terms of use and attribute data where required.
* Some write actions require user/guest sessions — simple API key is often read-only. ([The Movie Database (TMDB)][1])

## Purpose
My usecase: TMDB to fetch poster art and metadata, then combine it with Trakt (or your own watch history) to show rich, image-driven widgets on your site. Fetch `/configuration` at app boot to determine image sizes; cache posters and metadata server-side to limit API calls.
