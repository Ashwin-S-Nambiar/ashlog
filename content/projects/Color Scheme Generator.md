---
title: Color Scheme Generator
author: Ashwin S. Nambiar
date: 2025-09-27
tags: [projects, javascript, html, css, api, portfolio, experiments]
---

## Overview
Color Scheme Generator is a web application that allows users to generate harmonious color palettes based on a selected base color. It integrates with the [[notes/Public APIs/Color API]] to provide various harmony options and offers instant copying of color codes. The project emphasizes clean design, interactivity, and responsive layouts within [[notes/Web Development]].

Live: **[color-scheme-generator-liart.vercel.app](https://color-scheme-generator.ashwin.co.in)**  
Source code: **[GitHub](https://github.com/Ashwin-S-Nambiar/color-scheme-generator)** 

## Goals & Problems Solved
- Provide an easy way to generate harmonious color schemes for developers and designers.  
- Integrate with an external API for real-time color harmony generation.  
- Offer a simple interface with instant preview of results.  
- Enable one-click copying of color codes to streamline workflow.  
- Ensure responsive design for usability across devices.  

## Architecture & Tech Stack
| Layer                 | Technology / Library     | Purpose                                         |
| --------------------- | ------------------------ | ----------------------------------------------- |
| **Frontend**          | [[notes/HTML]], [[notes/CSS]], [[notes/JavaScript]] | Structure, styling, and interactivity            |
| **API**               | Color API      | Generate color schemes and harmony modes         |
| **Hosting**           | Vercel                   | Deployment and live hosting                      |

## Key Features & UX Flow
1. **Color Selection**  
   - Choose base color with an interactive color picker.  

2. **Color Harmony Generation**  
   - Supports multiple modes: Monochrome, Complement, Analogic, Triad, etc.  

3. **Preview & Copy**  
   - Real-time preview of schemes with one-click copy functionality.  

4. **Responsive Design**  
   - Optimized for desktop and mobile displays.  

## Code Walkthrough & Notable Modules
- **index.html**: Main entry point with input fields and color picker.  
- **styles.css**: Provides layout, responsive design, and hover animations.  
- **script.js**: Handles API requests, DOM updates, and copy-to-clipboard logic.  
- **assets/screenshots/**: Contains project visuals for documentation.  

## UI / Responsiveness & Design Decisions
- Clean and modern interface to showcase generated palettes.  
- Responsive grid layout adapts to varying screen sizes.  
- Hover states and subtle animations improve interactivity.  

## Challenges & Learnings
- Working with external APIs and managing dynamic updates.  
- Designing an interface that balances simplicity with functionality.  
- Handling edge cases such as invalid input or API errors.  

## Future Improvements
- Save and export palettes in multiple formats (CSS, JSON, SCSS).  
- User accounts for storing favorite palettes.  
- Accessibility features such as color contrast checking.  
- Social sharing of palettes.  

## Screens & Visuals
### Landing Page
![Landing Page](https://raw.githubusercontent.com/Ashwin-S-Nambiar/color-scheme-generator/main/assets/screenshots/LandingPage.png)

### Selecting a Shade
![Selecting a Shade](https://raw.githubusercontent.com/Ashwin-S-Nambiar/color-scheme-generator/main/assets/screenshots/SelectedPopup.png)

### Color Select
![Color Select](https://raw.githubusercontent.com/Ashwin-S-Nambiar/color-scheme-generator/main/assets/screenshots/ColorSelect.png)

### Mode Select
![Mode Select](https://raw.githubusercontent.com/Ashwin-S-Nambiar/color-scheme-generator/main/assets/screenshots/ModeSelect.png)

### Generated Results
![Result](https://raw.githubusercontent.com/Ashwin-S-Nambiar/color-scheme-generator/main/assets/screenshots/Results.png)
