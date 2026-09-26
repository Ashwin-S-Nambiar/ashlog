---
title: QuizzMe!
author: Ashwin S. Nambiar
date: 2026-09-25
updated: 2026-09-26
tags: [projects, react, javascript, tailwindcss, motion, portfolio, experiments, quiz-app]
---
## Overview
QuizzMe! is a trivia app for quick rounds on 24 topics. Pick a topic, a difficulty and how many questions, then play with each answer shown as you go or all of them held back until the end. Every round ends on a breakdown of how it went, and the questions you missed can be replayed on their own. It is built with [[notes/Tech Stack/React]] 19, [[notes/Tech Stack/TailwindCSS]] 4, [[notes/Tech Stack/Motion]] and [[notes/Tech Stack/Vite]] 8, with every topic, count and question coming from the [[notes/Public APIs/Open Trivia DB]].

The first version was a practice run at fetching data in React: a form of dropdowns, one round and a score. This rebuild keeps the idea and asks what a quiz should actually feel like to play, from picking a topic to seeing what you got wrong. There is no server and no account; scores stay in your browser.

Live: **[quizzme.ashwin.co.in](https://quizzme.ashwin.co.in)**  
Source code: **[Explore Repo](https://github.com/Ashwin-S-Nambiar/QuizzMe)**  

## Goals & Problems Solved
- **Live Topics and Counts**: Every topic shows how many questions it really has, and amounts cap at what exists, so a round never asks for more than the API can give.
- **Living With the Rate Limit**: Open Trivia DB allows one question request every five seconds. Requests queue, and the loading screen says how long the wait is instead of spinning.
- **No Repeats**: A session token rides along with every request, so back to back rounds don't serve the same questions.
- **Two Ways to Play**: See each answer as you go with streaks, or reveal them all at the end with free movement between questions.
- **A Proper Ending**: A score ring, best streak, average time, a split by difficulty and a review of every answer.
- **Practice What You Missed**: Replay only the wrong ones, reshuffled, without another API call.

## Architecture & Tech Stack
| Layer                 | Technology / Library                                              | Purpose                                                                  |
| --------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Framework / Build** | [[notes/Tech Stack/React]] 19, [[notes/Tech Stack/Vite]] 8        | No router: the screens are state, and the URL only carries a shared setup |
| **Styling**           | [[notes/Tech Stack/TailwindCSS]] 4                                | OKLCH theme tokens with light and dark sets                              |
| **Motion**            | [[notes/Tech Stack/Motion]], View Transitions API, canvas-confetti | Question transitions, sheets and springs, the theme switch, good rounds  |
| **Logic / State**     | [[notes/Tech Stack/JavaScript]], `useSyncExternalStore`           | Pure quiz functions with tests, and small persisted stores               |
| **Data API**          | [[notes/Public APIs/Open Trivia DB]]                              | Topics, counts, session tokens and questions                             |
| **Sound**             | Web Audio API                                                     | Every click, chime and buzz synthesized on the spot                      |
| **Icons / Tooling**   | Phosphor Icons, Biome, `node --test`                              | Icon set, linting and formatting, tests for the quiz logic               |

## Key Features & UX Flow
1. **Setup**
   - One card: pick a topic, a difficulty and how many questions, and go. Everything else folds into more options, and surprise me picks a topic for you.
   - Topics open in a sheet of colour-coded tiles, each with its own icon and question count, and the numbers roll into place like an odometer.
   - More options hold the question type, when answers are shown, and an optional 15 or 30 second timer.

2. **Play**
   - One question at a time. Answer as you go and a streak chip builds with each right answer, or hold every answer until the end and jump between questions from the progress segments.
   - `1` to `4` or `A` to `D` to answer, `Enter` or `→` for next, `←` to go back in reveal at the end mode, `Esc` to leave.
   - Mid-round, the back button opens the quit sheet instead of throwing the round away.

3. **Results**
   - A score ring, best streak, average time, a split by difficulty, and every answer to look back through.
   - Practice the ones you missed, or share a green and red grid through the share sheet with a link that opens the same setup.
   - Confetti for the good rounds, loaded only when it is needed.

4. **Stats**
   - Rounds, accuracy, best streak and accuracy by topic, from your last hundred rounds on this device.

5. **404**
   - A question too: where did this page go?

## Code Walkthrough & Notable Modules
- **Components** (`src/components`):
  • *Setup*, *Play*, *Results*: the three screens, with play, results and the 404 split out and loaded when needed.
  • *StatsSheet*, *Sheet*: the stats and topic sheets, dragged to dismiss on phones.
  • *Stickers*: the draggable stickers on the landing.
  • *RollingNumber*: each digit a strip of 0 to 9 that slides to its value, with the plain number for screen readers.
  • *Topbar*, *BottomBar*, *Toaster*, *Loading*: the bars, toasts and the counting-down loading screen. The bottom bars are portalled to `body` so they stay fixed inside animated screens.
- **Library** (`src/lib`):
  • *opentdb.js*: the Open Trivia DB client, with one promise-chain queue 5.2 s apart, a last-request time kept in `localStorage` so a reload can't earn a 429, retries that know why they failed, and a token kept warm for five and a half hours.
  • *quiz.js* / *quiz.test.js*: pure quiz logic and its tests.
  • *categories.js*: topic names, colours and icons.
  • *store.js*: persisted stores for preferences, stats and the rate limit clock.
  • *sound.js*: synthesized sounds, with a chime that climbs a semitone for each answer in a streak.

## UI / Responsiveness & Design Decisions
- **Restraint**: a warm off-white ground, near-black ink, one indigo accent, and green and red kept for right and wrong.
- **Stickers for Play**: pastel butter, sky, mint, lilac and peach, each topic with its own colour and duotone icon.
- **Typography**: Bricolage Grotesque for the big lines, Geist for everything else, Geist Mono for numbers.
- **One Screen, Any Screen**: the landing fits above the fold from an iPhone SE up to desktop, with a short variant for low viewports.
- **Phone First**: 44 px touch targets, safe-area padding, actions pinned to the bottom where thumbs are, and sheets you can throw.
- **Nothing Jumps**: self-hosted, preloaded fonts with metric-matched fallbacks, so layout shift measures 0.
- **Light and Dark**: follows the system until you choose; choose, and the new theme grows out of the toggle in a circle.
- **Accessible**: keyboard control for everything, and movement becomes fades when the system asks for reduced motion.

## Challenges & Learnings
- Designing around an API's limits instead of hiding them: a queue, a clock that survives a reload, and a loading screen that tells the truth.
- Not serving repeats, and knowing what to do when a mix runs dry.
- Keeping quiz logic in pure, tested functions, so the UI only ever reads state.
- Keeping the question card steady when questions and answers vary wildly in length.
- Using Motion for presence, layout and springs, and CSS for everything else.
- Synthesizing small sounds with the Web Audio API, and waiting until a browser lets audio start.
- Bottom bars that stay fixed inside animated screens and clear the home indicator on phones.

## Future Improvements
- **Daily Round**: the same questions for everyone, once a day.
- **Head to Head**: rounds with a friend from one link.
- **Sync**: stats that follow you across devices.

## Screens & Visuals

### Home
![The landing with draggable stickers and the round card](./assets/quizzme-home.webp)

### Topic Picker
![Every topic as a colour-coded tile with its icon and question count](./assets/quizzme-topics.webp)

### More Options
![The round card with more options open: mode, timer and question type](./assets/quizzme-options.webp)

### Streak
![A right answer with a three in a row streak chip](./assets/quizzme-streak.webp)

### Wrong Answer
![A wrong answer marked with the right one shown](./assets/quizzme-wrong.webp)

### Reveal at the End
![Reveal at the end mode with the chosen answer outlined and the progress segments](./assets/quizzme-reveal.webp)

### Results and Review
![The results ring, best streak, split by difficulty and one missed question opened](./assets/quizzme-results.webp)

### Your Stats
![Rounds, accuracy, best streak and accuracy by topic](./assets/quizzme-stats.webp)

### 404
![The 404 asked as a quiz question](./assets/quizzme-404.webp)
