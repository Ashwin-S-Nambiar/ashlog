---
title: Trakt API
date: 2025-10-28
tags: [api, movies, tv, web, notes]
---
The **Trakt API** is a powerful [[notes/REST]]ful interface that allows developers to interact with **Trakt.tv**, a platform for tracking movies and TV shows. It provides access to user watch history, trending content, ratings, recommendations, lists, and social interactions across media consumption.

Documentation: [Trakt API Docs](https://trakt.docs.apiary.io)

## Key Features & Capabilities
* Access **movie and TV show metadata**, including ratings, genres, people, and images.
* Retrieve **trending, popular, and most-watched** titles.
* Track and manage a user’s **watch history**, progress, and collections.
* **Scrobble** playback (start, pause, stop events).
* Get or modify **user lists, ratings, and comments**.
* Sync user activity across multiple platforms or devices.
* Integrate with **third-party apps** for personalized content tracking.

## Authentication & Authorization
Trakt uses **OAuth 2.0** for authentication and user-specific actions.

### Common OAuth Flows
* **Authorization Code Flow** Required for user-based endpoints (read/write to watch history, lists, etc.).
* **Device Code Flow** Ideal for devices or apps without a web browser.
* **API Key (Client ID)** For public endpoints (metadata, trending, etc.), no user auth required.

Include credentials in headers:

```http
Authorization: Bearer {access_token}
trakt-api-version: 2
trakt-api-key: {client_id}
```

## Typical Request Structure
* Base URL: `https://api.trakt.tv/`
* Common endpoints:

  * `GET /movies/trending`
  * `GET /shows/popular`
  * `GET /users/{username}/watched/movies`
  * `POST /scrobble/start`
  * `POST /checkin`

All requests must include `trakt-api-version` and `trakt-api-key` headers.

## Rate Limits & Policies
* Trakt enforces rate limits (usually **1,000 requests per 5 minutes per IP**).
* Exceeding limits results in `429 Too Many Requests`.
* Always handle retries and respect user rate quotas.

## Use Cases & Integration
* **Portfolio or personal dashboards** showing currently watched movies or recent activity.
* **Media tracker apps** for monitoring watch progress or syncing with local media servers (e.g., Plex, Kodi).
* **Recommendation systems** using trending and popular endpoints.
* Integrations with **social feeds** showing what users are currently watching.
* **Smart home displays** showing now-watching status.

## Example: Get Trending Movies
Request:

```http
GET https://api.trakt.tv/movies/trending
trakt-api-version: 2
trakt-api-key: {client_id}
```

Sample JSON Response (simplified):

```json
[
  {
    "watchers": 3518,
    "movie": {
      "title": "Dune: Part Two",
      "year": 2024,
      "ids": {
        "trakt": 123456,
        "slug": "dune-part-two-2024",
        "imdb": "tt15239678",
        "tmdb": 693134
      }
    }
  }
]
```

## Advantages & Limitations
**Advantages**
* Rich metadata for both movies and TV shows
* Easy integration for personal projects or dashboards
* Supports both user and public endpoints
* Active community with existing client libraries (JavaScript, Python, etc.)

**Limitations**
* Some endpoints require **OAuth user authentication**
* Strict rate limiting
* Limited official SDKs (you often have to build requests manually)

## Purpose
This API can be used to **show your currently watched movie or series** directly on your portfolio or website adding a personal, dynamic touch similar to “Now Playing on Spotify.”
You can see it in action via integration with Trakt data, e.g. “Currently Watching: *Dune: Part Two*” embedded in your portfolio.