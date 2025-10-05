---
title: Spotify Web API
tags: [api, music, web, notes]
---
The **Spotify Web [[notes/API]]** is a [[notes/REST]]ful interface provided by Spotify that allows developers to retrieve and manipulate Spotify’s catalog data, control playback, manage playlists, and access user-related data.

Documentation: [Spotify Developer – Web API](https://developer.spotify.com/documentation/web-api)

## Key Features & Capabilities
- Fetch metadata for tracks, albums, artists, playlists, shows, episodes, and categories. 
- Search Spotify’s catalog (tracks, albums, artists, playlists) via query parameters.
- **Playback control**: play, pause, skip, seek, and manage a user’s playback queue (for authorized users).
- Manage a user’s library: saved tracks, albums, and playlists.  
- Create, modify, and delete playlists. 
- Get user profile, followed artists, and user’s top items.  

## Authentication & Authorization
Spotify Web API uses **OAuth 2.0** for authentication and authorization. 

### Common OAuth Flows
- **Authorization Code Flow**: for user-based actions (requires redirect URI).  
- **Client Credentials Flow**: for non-user endpoints where user data is not required (no user login).  

Clients must include an **access token** in the `Authorization` header of API requests.  

## Typical Request Structure
- Base URL: `https://api.spotify.com/v1/`  
- Endpoint examples:  
  - `GET /albums/{id}`  
  - `GET /artists/{id}/top-tracks`  
  - `POST /playlists/{playlist_id}/tracks`  
  - `PUT /me/albums`  

- Requests must include proper scopes and be authorized.  

## Rate Limits & Policies
Spotify enforces rate limits to prevent abuse. Exceeding limits returns HTTP status `429 Too Many Requests`. Developers should handle retry logic.

Recently, Spotify made policy changes restricting certain endpoints and access for new or in-development apps.

## Use Cases & Integration

- Music apps that allow users to search, play, or manage tracks and playlists  
- Dashboards showing user listening statistics  
- Recommendation systems based on user tastes  
- Integrations with smart home devices or bots to control Spotify playback  
- Embedding previews or snippets of Spotify content  

## Example: Search for a Track
Request:
```http
GET https://api.spotify.com/v1/search?q=track:Imagine&type=track&limit=1
Authorization: Bearer {access_token}
```

Sample JSON Response (simplified):

```json
{
  "tracks": {
    "items": [
      {
        "id": "3e9HZxeyfWwjeyPAMmWSSQ",
        "name": "Imagine",
        "artists": [
          { "name": "John Lennon" }
        ],
        "album": {
          "name": "Imagine"
        }
      }
    ]
  }
}
```

## Advantages & Limitations
**Advantages**
* Access to Spotify’s large music catalog and metadata
* Rich control over playback and user library
* Strong community with SDKs and client libraries

**Limitations**
* You must handle OAuth flow and token refresh
* Some endpoints require user’s explicit permission (scopes)
* New apps may face restrictions due to recent policy changes

## Purpose
This is used in the Now Playing widget that you can see in my portfolio https://ashwin.co.in/#my-gear