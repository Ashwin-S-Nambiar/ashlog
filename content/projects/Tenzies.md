---
title: Tenzies
author: Ashwin S. Nambiar
date: 2025-09-29
tags: [projects, react, vite, framer-motion, javascript, css, games, portfolio]
---
## Overview
**Tenzies** is an addictive dice game where **strategy meets luck**. Players roll ten dice, strategically hold certain values, and continue rolling until all dice match. Built with [[notes/Tech Stack/React]], it emphasizes engaging gameplay, smooth animations, and responsive design within [[notes/Web Development]]. This project as build as part of my learning journey with [[notes/Scrimba]], do check them out if you are trying to get into web development.

Live: **[tenzies.ashwin.co.in](https://tenzies.ashwin.co.in)**  
Source code: **[Explore Repo](https://github.com/Ashwin-S-Nambiar/Tenzies)**

## Goals & Problems Solved
- Create a fun and interactive casual game playable on any device.  
- Practice state management and UI updates with React.  
- Provide clear win/loss conditions with instant feedback.  
- Deliver smooth and responsive animations for an engaging player experience.  

## Architecture & Tech Stack
| Layer        | Technology / Library     | Purpose                                      |
| ------------ | ------------------------ | -------------------------------------------- |
| **Frontend** | React, [[notes/Tech Stack/JavaScript]], [[notes/Tech Stack/CSS]] | UI components, game logic, styling           |
| **Tooling**  | [[notes/Tech Stack/Vite]]                     | Development server and build system           |
| **Animation**| [[notes/Tech Stack/Motion]], React Confetti | Smooth transitions, dice animations, victory effects |
| **Hosting**  | Vercel                   | Deployment and live hosting                   |

## Key Features & UX Flow
1. **Interactive Dice Rolling**  
   - Roll ten dice, each with values between 1 and 6.  

2. **Strategic Holds**  
   - Click dice to "hold" values, keeping them fixed during subsequent rolls.  

3. **Performance Tracking**  
   - Track number of rolls taken to win.  

4. **Victory & Loss States**  
   - Win when all dice match; enjoy a confetti animation.  
   - Display alternate screens when conditions aren’t met.  

5. **Responsive Design**  
   - Optimized for mobile and desktop play.  

## Code Walkthrough & Notable Modules
- **App.jsx**: Main game logic and React state management.  
- **Die.jsx**: Dice component with click/hold interactivity.  
- **styles.css**: Handles layout, responsiveness, and animations.  
- **animations (Motion)**: Provides smooth rolling effects.  
- **React Confetti**: Implements celebratory victory screen.  
- **public/screenshots/**: Contains project visuals for documentation.  

## UI / Responsiveness & Design Decisions
- Clean, game-focused layout to keep attention on dice and rolls.  
- Bright colors and animations to enhance playfulness.  
- Minimalist footer and instructions for guidance.  
- Mobile-first design ensures usability across devices.  

## Challenges & Learnings
- Implementing **stateful gameplay logic** (holding dice and re-rolling selectively).  
- Using **Motion** for smooth transitions without performance issues.  
- Managing **game state resets** and replay flow.  
- Balancing **responsiveness** and fun UI design.  

## Future Improvements
- Add **timer-based scoring system**.  
- Introduce **multiplayer mode** or leaderboards.  
- Support **different difficulty levels**.  
- Add **sound effects** for rolls, holds, and victory.  

## Screens & Visuals
### Landing Page
![Landing Page](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Tenzies/main/public/screenshots/Tenzies-1.png)

### Full Interface
![Full Interface](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Tenzies/main/public/screenshots/LandingFullPage.png)

### Footer Section
![Footer](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Tenzies/main/public/screenshots/Tenzies-2.png)

### Instructions
![Instructions](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Tenzies/main/public/screenshots/Tenzies-4.png)

### Victory Screen
![Victory](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Tenzies/main/public/screenshots/Tenzies-5.png)

### Game Lost
![Game Lost](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Tenzies/main/public/screenshots/Tenzies-6.png)
