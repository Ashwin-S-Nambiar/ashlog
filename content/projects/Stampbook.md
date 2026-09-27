---
title: Stampbook
author: Ashwin S. Nambiar
date: 2026-09-27
updated: 2026-09-27
aliases: [projects/Travel-Journal]
tags: [projects, react, javascript, tailwind, maps, indexeddb, portfolio, web-app]
---
## Overview
Stampbook is a travel journal made to look like a passport. Every trip you log is inked onto a visa page as its own entry stamp, and one map beside it flies to the place when you open it. Places come from [Photon](https://photon.komoot.io) search over [OpenStreetMap](https://www.openstreetmap.org) data, the map tiles from [OpenFreeMap](https://openfreemap.org), and the country borders from [Natural Earth](https://www.naturalearthdata.com), drawn the way India draws them. It is built with [[notes/Tech Stack/React]], [[notes/Tech Stack/TailwindCSS]], [[notes/Tech Stack/Motion]] and [MapLibre GL JS](https://maplibre.org) on [[notes/Tech Stack/Vite]].

The first version, Travel Journal, showed three trips written into the code as cards with a photo, a date and a Google Maps link. This rebuild has a new name, a new design, your own trips kept on your device, and a lot more to it.

Live: **[stampbook.ashwin.co.in](https://stampbook.ashwin.co.in)**  
Source code: **[Explore Repo](https://github.com/Ashwin-S-Nambiar/Stampbook)**  

## Goals & Problems Solved
- **Your Own Trips**: Log real trips instead of reading three written into the code.
- **A Place, Not a Link**: Search a city or landmark, or tap the map, instead of pasting a Google Maps URL.
- **See Where You've Been**: One map with every trip on it, that flies to each one as you open it.
- **Keep It Private**: Trips, notes and photos stay on the device, with a backup file to move them.
- **The Right Map**: India's official borders, with Jammu and Kashmir, Ladakh and Arunachal Pradesh whole.

## Architecture & Tech Stack
| Layer              | Technology / Library                                                                                          | Purpose                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **UI**             | [[notes/Tech Stack/React]] 19, [[notes/Tech Stack/Vite]] 8                                                     | Components, query based routes, a matching 404                  |
| **Style / Motion** | [[notes/Tech Stack/TailwindCSS]] 4, [[notes/Tech Stack/Motion]] 13                                             | The passport, page slides, the flying stamp, the date picker    |
| **Map**            | [MapLibre GL JS](https://maplibre.org) 6, [OpenFreeMap](https://openfreemap.org) tiles                         | One map, recoloured to the paper, carried between pages         |
| **Borders**        | [Natural Earth](https://www.naturalearthdata.com) 10m boundary lines, India point of view                      | Replaces the tiles' borders with India's official ones          |
| **Search**         | [Photon](https://photon.komoot.io) on [OpenStreetMap](https://www.openstreetmap.org) data                      | Search as you type, and reverse lookup when you drop a pin      |
| **Storage**        | IndexedDB                                                                                                      | Trips and photos, resized on the device, and a backup file      |
| **Type / Icons**   | Barlow Condensed, Public Sans, Red Hat Mono, [Phosphor](https://phosphoricons.com)                            | Self-hosted fonts with metric-matched fallbacks                 |
| **Hosting**        | Vercel                                                                                                         | Static build with a real 404                                    |

## Key Features & UX Flow
1. **The Passport**
   - The map is the left page and the stamps the right, six stamps a page like a real passport, oldest first. Swipe, use the arrows or the arrow keys to turn.
   - The foot of the map page reads like a passport's machine readable line: days away and the kilometres between your trips.

2. **Stamp a Trip**
   - Search a place, or tap the map to drop a pin and let it work out where that is. The stamp fills in beside the form as you go.
   - A range date picker counts the days you stayed; a popover on desktop, a sheet you can drag down on phones.
   - Save it and the stamp thumps onto the page with a jolt and a thud.

3. **An Entry**
   - The stamp you tap flies from the grid into the entry, and the map flies in to the place with its pin marked and the others faded.
   - Notes, up to 24 photos with a full screen viewer, and arrows to step to the previous or next stamp.

4. **One Map**
   - There is only ever one map. It is rendered once and moved between pages, so on phones it glides from the home page to the top of an entry instead of loading again.

5. **Yours, on the Device**
   - Everything lives in IndexedDB. A backup saves trips and photos as one file to restore anywhere, and removing a stamp can be undone.
   - A new passport opens with three of my own trips, Delhi, Kolkata and Jaipur, so it's never blank.

## Code Walkthrough & Notable Modules
- **`src/App.jsx`**: layout, the shared map, page transitions and the footer.
- **src/components/**:
  • *Stamp.jsx*: the six stamp shapes in SVG, with text that fits any place name.
  • *Home.jsx*, *Stamps.jsx*: the pages, the stamp grid that picks its own layout, and the thud.
  • *Entry.jsx*, *Form.jsx*, *DatePicker.jsx*: an entry, new and edit, and the range picker.
  • *MapView.jsx*, *MapSlot.jsx*: the map, its pins, and moving it between pages with a FLIP animation.
- **src/lib/**:
  • *map.js*: loads MapLibre and recolours the style, swapping in the Natural Earth borders.
  • *photon.js*: search and reverse lookup.
  • *db.js*, *photos.js*, *backup.js*: IndexedDB, photo resizing and the backup file.
  • *stamp.js*: shape, ink and tilt for a trip.
- **`public/borders.json`**: country borders from Natural Earth, India's point of view.

## UI / Responsiveness & Design Decisions
- **A Passport**: The navy of an Indian passport's cover with gold foil for the name and the main button, pale security paper with a guilloche pattern, and a shadow down the fold.
- **Ink, Not Cards**: Stamps are red, blue or green with a grainy impression from an SVG noise filter, so they look pressed rather than printed.
- **Typography**: Barlow Condensed for stamps and labels, Public Sans for everything you read, Red Hat Mono for dates and the passport line.
- **No Dark Mode**: Passport pages are paper.
- **Every Screen**: Two pages on wide screens; on phones and tablets the map sits on top with the stamps below, side by side on a short landscape phone. Checked at 18 sizes from a 320 px phone to a 2560 px monitor with no sideways scroll.
- **Nothing Jumps**: Self-hosted, preloaded fonts with metric-matched fallbacks, and the passport fades in once they're ready. Layout shift measures 0.

## Challenges & Learnings
- Keeping one WebGL map alive across every page by moving its container, and animating the move.
- The vector tiles only carry merged, unnamed borders, so drawing India's official borders meant replacing them with Natural Earth's point of view lines.
- Stamp text that fits any place name on circles, ovals and octagons.
- A shared layout animation from the grid to the entry without a flash during the cross-fade.
- An accessible range date picker built as a real table, with keyboard support.

## Future Improvements
- **Sync**: between devices without an account.
- **Print**: a printable passport of your year.
- **Routes**: lines drawn between trips on the map.

## Screens & Visuals

### Home
![The open passport: a map of north India with three pins on the left page, and red, blue and green stamps for Delhi, Kolkata and Jaipur on the right](./assets/stampbook-home.webp)

### An Entry
![Delhi's entry: the map zoomed to New Delhi on the left, and the round red stamp, dates, notes and photos on the right](./assets/stampbook-entry.webp)

### New Stamp
![Searching Hampi, with places listed under the search over the map](./assets/stampbook-search.webp)

### Dates
![The date picker open with 12 to 15 September selected for a four day stay](./assets/stampbook-dates.webp)

### Edit
![Editing Jaipur, with its stamp, dates, notes and photos](./assets/stampbook-edit.webp)

### Photos
![A photo of Howrah Bridge open full screen from the Kolkata entry](./assets/stampbook-photos.webp)

### 404
![A red no entry stamp on a passport page](./assets/stampbook-404.webp)
