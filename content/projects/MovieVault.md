---
title: MovieVault
author: Ashwin S. Nambiar
date: 2025-09-21
updated: 2026-09-15
tags: [projects, react, javascript, portfolio, experiments, movie-app, streaming, view-transitions]
---
## Overview
MovieVault is a streaming guide and watchlist. It shows where any film, series or anime is streaming in your region, lays out whole franchises in release order, and keeps a vault of what to watch next. It is built with [[notes/Tech Stack/React]] 19, React Router 8, [[notes/Tech Stack/TailwindCSS]] 4 and [[notes/Tech Stack/Vite]] 8, with every title, collection, season and streaming provider coming from the [[notes/Public APIs/TMDB API]].

The first version was a watchlist with a search box, with [[notes/Tech Stack/Motion]] for its transitions. This rebuild starts from the question that version never answered, *where can I watch this tonight?*, and drops every animation and data-fetching library along the way: the motion is plain maths and the View Transitions API.

Live: **[movievault.ashwin.co.in](https://movievault.ashwin.co.in)**  
Source code: **[Explore Repo](https://github.com/Ashwin-S-Nambiar/MovieVault)**  

## Goals & Problems Solved
- **Where to Watch**: Every title lists the services it streams, rents or sells on in your region, with the services you pay for first. Availability comes from JustWatch through TMDB.
- **Your Services**: Pick your streaming services and region once; home and search then show what you can actually watch.
- **Films, Series and Anime**: One search across all three, with anime recognised through TMDB's anime keyword.
- **Universes**: Franchises like the MCU, Star Wars, Middle-earth and Dune as release-order timelines.
- **A Vault**: Save anything, filter and sort it, and undo any removal.
- **Motion with a Purpose**: Transitions that show where you are going and bring you back to where you were.

## Architecture & Tech Stack
| Layer                 | Technology / Library                                       | Purpose                                                              |
| --------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| **Framework / Build** | [[notes/Tech Stack/React]] 19, [[notes/Tech Stack/Vite]] 8 | Component-based UI, fast dev server & production builds              |
| **Routing**           | React Router 8 (data router)                               | Navigation through the View Transitions API, with scroll restoration |
| **Styling**           | TailwindCSS 4 reset, hand-written [[notes/Tech Stack/CSS]] | A token-based stylesheet with light and dark themes                  |
| **Motion**            | View Transitions API, requestAnimationFrame                | Shared-element page transitions and the spring-driven reel           |
| **Logic / State**     | [[notes/Tech Stack/JavaScript]]                            | A cached query hook, persisted stores and API status tracking        |
| **Data API**          | [[notes/Public APIs/TMDB API]]                             | Titles, collections, seasons, credits, videos and providers          |
| **Icons / Tooling**   | Tabler Icons, Biome                                        | Icon set, linting and formatting                                     |

## Key Features & UX Flow
1. **The Reel**
   - Trending titles sit on a 3D ring of DVD cases that turns on its own and pauses while you hover.
   - Drag, flick, scroll sideways or use the arrow keys; the ring settles on a critically damped spring, so a drag hands its momentum straight into the glide.

2. **Case Transitions**
   - Tap the centre case and it flies into the detail page and opens to reveal the disc.
   - Going back closes the case and flies it back to the exact spot it came from: into the ring, onto a universe timeline, or back onto the search shelf, where the spine slides back into place.

3. **Detail Pages**
   - Where to watch, age rating, runtime, genres, cast and crew, budget and box office, the trailer and recommendations.
   - Series get seasons with episode lists, the next air date, networks and creators.
   - Connected titles show what came before and after in release order, with a strip of the whole franchise.

4. **Search**
   - One search across films, series and anime with type filters, sorting, infinite scroll and recent searches.
   - A shelf of trending spines and browse cards when the search is empty; the search pill morphs between pages.

5. **Universes & Vault**
   - Each universe shows its span, average rating, what's upcoming and a one-tap "save all".
   - The vault filters by type, sorts, and offers undo on every removal.

6. **Honest API Status**
   - Failed requests retry with backoff, and a small pill appears only when TMDB is unreachable, you're offline or the key is wrong.

## Code Walkthrough & Notable Modules
- **`src/main.jsx`**: creates the data router and the routes for home, search, titles, universes and the vault.
- **Pages** (`src/pages`): *Home*, *Search*, *Title*, *Universes*, *Universe*, *Vault* and *NotFound*.
- **Components** (`src/components`):
  • *Reel*: the 3D ring, positioned every frame with plain maths, with drag, wheel, keyboard and autoplay.
  • *Case* / *OpenCase*: the DVD case, and the version on the detail page that opens to reveal the disc.
  • *Connected*: previous and next titles plus the franchise strip.
  • *Providers*, *ServicesSheet*: where to watch, and picking your services and region.
  • *SettingsSheet*: appearance and the live TMDB connection status, opened from the gear in the header.
  • *Sheet*, *Toaster*, *StatusPill*: drag-to-dismiss sheets, undoable toasts and the API status pill.
  • *Img*: image loading with preview sizes, and keeping recently shown images warm so returning pages paint immediately.
- **Library** (`src/lib`):
  • *tmdb.js* / *catalog.js*: the TMDB client and the mapping into films, series, anime, universes and connected titles.
  • *useQuery.js*: a small request cache with a TTL, backed by session storage.
  • *hero.js*: hands the flying case from one page to the next, and back.
  • *store.js*, *watchlist.js*, *prefs.js*: persisted stores for the vault, services, region and theme.
  • *health.js*: tracks the requests the app really makes to decide when TMDB is down.

## UI / Responsiveness & Design Decisions
- **Restraint**: warm off-white ground, near-black ink, one red for saving, and pastel chips for browsing, with a matching dark theme.
- **Typography**: Geist for everything, Geist Mono for small numbers like years.
- **Phone First**: a bottom search dock that rides above the keyboard, drag-to-dismiss sheets, 44px touch targets and safe-area padding, scaling up to a two-column detail page and a wider ring on desktop.
- **Calm Loading**: skeletons match the real layout and share one synchronised sweep, and results stay on screen while new ones load.
- **Solid Surfaces**: floating controls use solid fills rather than frosted glass, so nothing shifts in colour while pages crossfade.
- **Accessible**: keyboard navigation throughout, focus management in dialogs, and `prefers-reduced-motion` respected everywhere.

## Challenges & Learnings
- Landing the shared-element transition on the exact element you came from, on the way in and on the way back, and learning what view transition snapshots do to 3D transforms, backdrop filters and scroll positions.
- Keeping a 3D ring of sixteen cases smooth on phones without an animation library.
- Assembling franchises and recognising anime from TMDB keywords and collections.
- Caching, retrying and tracking the health of requests without a data-fetching library.
- Keeping images in memory across routes, so a page you return to paints its posters in the first frame instead of waiting on the disk cache.

## Future Improvements
- **Sync**: keep the vault in step across devices.
- **Alerts**: tell you when a saved title lands on one of your services.
- **History**: watched history and personal ratings.
- **Sharing**: share a vault or a universe as a link.

## Screens & Visuals

### The Reel
![The reel of trending titles on a ring of DVD cases](./assets/movievault-reel.webp)

### Title Details
![Dune: Part Two with its case open and where it streams](./assets/movievault-title.webp)

### Where to Watch and Connected Titles
![Streaming services, the Dune universe in release order and the cast](./assets/movievault-connected.webp)

### Search
![The shelf of trending spines above the browse cards and trending grid](./assets/movievault-search.webp)

### Search Results
![Search results for Dune across films and series](./assets/movievault-results.webp)

### Universes
![Every universe as a grid of backdrops](./assets/movievault-universes.webp)

### Universe Timeline
![The Marvel Cinematic Universe as a release-order timeline](./assets/movievault-universe.webp)

### Your Vault
![Saved films and series with where each one streams](./assets/movievault-vault.webp)

### Your Services
![Picking streaming services in the services sheet](./assets/movievault-services.webp)

### Settings
![The settings sheet with appearance and the TMDB connection](./assets/movievault-settings.webp)
