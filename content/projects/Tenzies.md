---
title: Tenzies
author: Ashwin S. Nambiar
date: 2026-09-28
updated: 2026-09-28
tags: [projects, react, javascript, tailwind, threejs, webgl, games, portfolio]
---
## Overview
Tenzies is a dice game. Roll ten dice, tap the ones you want to keep and roll the rest, until all ten show the same number. Once you roll, held dice stay held, so every hold is a commitment, and fewer rolls is better. It is built with [[notes/Tech Stack/React]], [[notes/Tech Stack/TailwindCSS]], [[notes/Tech Stack/Motion]] and [three.js](https://threejs.org) on [[notes/Tech Stack/Vite]].

The first version was a React exercise from my time with [[notes/Scrimba]]: flat dice in a white card, tap to hold, and confetti on a win. This rebuild keeps the rules and changes everything around them. The page is the felt of a dice tray, the dice are real 3D dice, and the game now keeps time, remembers your games and warns you before a roll you'd lose.

Live: **[tenzies.ashwin.co.in](https://tenzies.ashwin.co.in)**  
Source code: **[Explore Repo](https://github.com/Ashwin-S-Nambiar/Tenzies)**  

## Goals & Problems Solved
- **Dice That Feel Like Dice**: Rounded, lit dice that tumble and land, instead of flat squares that swap numbers.
- **Every Hold Counts**: Held dice lock once you roll, so the game has to say where you stand before you commit.
- **Something to Beat**: A clock, your fewest rolls and your last ten games, kept on your device.
- **Play It Anywhere**: One screen from a 320 px phone to a 2560 px monitor, with the keyboard or a thumb.
- **Nothing Jumps**: No layout shift on load or while you play.

## Architecture & Tech Stack
| Layer              | Technology / Library                                                              | Purpose                                                        |
| ------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **UI**             | [[notes/Tech Stack/React]] 19, [[notes/Tech Stack/Vite]] 8                         | The tray, the game store, a matching 404                       |
| **Style / Motion** | [[notes/Tech Stack/TailwindCSS]] 4, [[notes/Tech Stack/Motion]] 13                 | The felt, sheets, the hint line and toasts                     |
| **Dice**           | [three.js](https://threejs.org) r186, WebGL                                        | Rounded box dice on one canvas, the tumble, the win and loss   |
| **Sound**          | Web Audio API                                                                      | Rolls, holds and the win, synthesized, with a mute toggle      |
| **Storage**        | localStorage                                                                       | The game in progress, your stats, the sound setting            |
| **Type / Icons**   | Unbounded, Onest, [Lucide](https://lucide.dev)                                    | Self-hosted fonts with metric-matched fallbacks                |
| **Hosting**        | Vercel                                                                             | Static build with a real 404                                   |

## Key Features & UX Flow
1. **Roll and Hold**
   - Tap a die to hold it and it turns ivory. Roll, and every die you didn't hold tumbles again.
   - Once you roll, held dice stay held. Tap one and it shakes, with a note on why.

2. **The Hint Line**
   - The line under the dice counts where you stand: "5 of 10 on fours. Roll the other 5."
   - Hold a die that doesn't match and it warns you, and the button turns into Roll anyway.
   - Roll anyway and it's over: the odd ones shake and get a red ring.

3. **Win**
   - Hold ten matching dice and all ten hop in a wave. The win line says how many rolls and how long, and whether it's your first, fewest or fastest.
   - Share sends the result through the phone's share sheet, or copies it on a computer.

4. **Your Games**
   - A clock that starts on your first move and pauses when you leave the tab, your best up top, and a sheet with played, win rate, streak, fewest rolls, fastest and your last ten games.
   - Close the tab mid game and it's still there when you come back.

5. **Keys, Sounds, Haptics**
   - `Space` rolls or starts again, `1` to `0` hold dice one to ten, `n` starts a new game with undo.
   - Clatter on a roll, a clack on a hold and a chord on a win, quiet under the iOS silent switch. Haptics on Android.

## Code Walkthrough & Notable Modules
- **`src/App.jsx`**: the tray, the tally, the board, the hint line and the buttons.
- **src/components/**:
  • *Die.jsx*: one die's button, its shadow and the flat fallback.
  • *Stats.jsx*, *HowTo.jsx*, *Sheet.jsx*: your games and the rules, in a sheet on phones and a dialog on wider screens.
  • *RollingNumber.jsx*, *Toaster.jsx*: the roll count odometer, and toasts with undo.
- **src/lib/**:
  • *game.js*: the rules as pure functions: roll, hold, win, lose and stats.
  • *play.js*: the game store, the clock, and the sounds and haptics for each move.
  • *dice3d.js*: the 3D dice: geometry, lighting, the tumble, holds, the win hop and the loss shake.
  • *sound.js*, *tip.js*: Web Audio and tooltips.

## UI / Responsiveness & Design Decisions
- **A Dice Tray**: Deep petrol felt with a fine grain and a soft vignette, edge to edge.
- **The First Version's Colours**: Casino red dice with ivory pips; held dice turn ivory with ink pips, which is how the first version showed a held die too.
- **One Light**: The dice are lit from the top left, their shadows fall to the bottom right, and the felt bounces a little teal onto their undersides so they sit on the table.
- **One Canvas, Real Buttons**: One WebGL canvas draws all ten dice over ten real buttons, so taps, keys and screen readers still work. Without WebGL you get flat dice that play the same.
- **Typography**: Unbounded, wide and round like the pips, for the name, the numbers and the win line. Onest for everything you read.
- **No Dark Mode**: The felt is already dark.
- **Every Screen**: On phones Roll sits at the bottom for your thumb; on a short landscape phone the dice line up in one row. It never scrolls, from 320 px up.
- **Nothing Jumps**: Fixed-width counters, a fixed-height hint line and buttons that swap in place. Layout shift measures 0 on load and while you play.

## Challenges & Learnings
- CSS 3D cubes can't have rounded edges or light their faces continuously, so the dice moved to three.js with rounded box geometry and colours as shader uniforms.
- Tuning the lights by measuring rendered pixels against the palette, so a red die on screen is the red in the design.
- Keeping WebGL dice and DOM buttons in step: the canvas measures the buttons and draws each die where its button is.
- A tumble that reads as a throw: staggered starts, a lift, and a settle with a small overshoot, with DOM shadows on the same timing.
- Zero layout shift while playing, checked by recording every layout shift during a scripted game.

## Future Improvements
- **Modes**: More dice, or harder rules.
- **Daily Board**: Everyone starts from the same first roll.
- **Smaller Download**: Split three.js into its own chunk.

## Screens & Visuals

### Home
![Ten red dice on green felt, with the roll count, the clock and the best score above and a roll button below](./assets/tenzies-home.webp)

### Holding
![Five dice held in ivory on fours, the other five red, over the line 5 of 10 on fours, roll the other 5](./assets/tenzies-holding.webp)

### Mid Roll
![The red dice tumbling in 3D mid roll while the held ivory fours stay still](./assets/tenzies-rolling.webp)

### Tenzies!
![All ten dice ivory on fours, under the line Tenzies, 6 rolls in 0:31, all on fours](./assets/tenzies-won.webp)

### No Match
![Nine fours and one two held, the two ringed red, under No match](./assets/tenzies-lost.webp)

### Your Games
![The your games sheet: played, win rate, streak, fewest rolls, fastest and the last games](./assets/tenzies-games.webp)

### How to Play
![The how to play sheet: four steps, each with a row of small dice, and the keyboard shortcuts](./assets/tenzies-howto.webp)

### 404
![Two red dice with an empty space between them and the line this page rolled off the table](./assets/tenzies-404.webp)
