---
title: MovieVault
author: Ashwin S. Nambiar
date: 2025-09-21
tags: [projects, react, javascript, portfolio, experiments, movie-app]
---
## Overview
MovieVault is a front-end web application designed to make it easier for users to discover movies, view details, and maintain a personal watchlist. By leveraging the [[notes/Public APIs/TMDB API]], the app provides access to movie plots, release years, genres, and other metadata. Smooth animations powered by [[notes/Tech Stack/Motion]] (previously as **Framer Motion**), along with responsive design via [[notes/Tech Stack/TailwindCSS]], deliver a polished and engaging user experience. Earlier version used [[notes/Public APIs/OMDb]], due to it's downtime I migrated to TMDB.

Live: **[movievault.ashwin.co.in](https://movievault.ashwin.co.in)**  
Source code: **[Explore Repo](https://github.com/Ashwin-S-Nambiar/MovieVault)**  

## Goals & Problems Solved
- **Search Functionality**: Quickly search for movies by title.  
- **Comprehensive Movie Details**: Display plot, release year, genre, and poster images.  
- **Personalized Watchlist**: Add and remove movies to manage a watch queue.  
- **Modern UI/UX**: Deliver smooth transitions and responsiveness across devices.  
- **API Integration**: Reliably fetch data using the TMDB API.  

## Architecture & Tech Stack
| Layer                 | Technology / Library            | Purpose                                                     |
| --------------------- | ------------------------------- | ----------------------------------------------------------- |
| **Framework / Build** | [[notes/Tech Stack/React]], [[notes/Tech Stack/Vite]] | Component-based UI, fast dev server & production builds      |
| **Styling**           | TailwindCSS, [[notes/Tech Stack/CSS]]      | Utility-first styling and responsive design                 |
| **Animations**        | Motion                          | Smooth transitions and gesture handling                     |
| **Routing**           | React Router                    | Declarative navigation across app pages                     |
| **Logic**             | [[notes/Tech Stack/JavaScript]]            | Application logic, state management, API handling           |
| **Data API**          | TMDB                            | Provides detailed movie data                                |

## Key Features & UX Flow
1. **Movie Search**  
   - User inputs a movie title, and results are fetched from the API.  

2. **Detailed Information**  
   - Clicking a result shows movie details including plot, year, and genre.  

3. **Watchlist Management**  
   - Add movies to a personalized list.  
   - Remove them once watched or no longer needed.  

4. **Navigation**  
   - Handled with React Router (Home, Search, Watchlist, Details).  

5. **Responsive Design & Animations**  
   - Mobile-friendly design ensures usability across devices.  
   - Framer Motion provides fluid transitions between views.  

## Code Walkthrough & Notable Modules
- **`src/App.jsx`**: sets up routing and application layout.  
- **Components**:  
  • *SearchBar*: handles search input and API requests.  
  • *MovieCard*: displays movie information in search results and watchlist.  
  • *Watchlist*: shows curated list of saved movies.  
  • *MovieDetails*: dedicated page for detailed metadata.  
  • *NotFound*: fallback 404 page for invalid routes.  
- **API Handling**: integrates with the TMDB API using API keys from `.env`.  
- **State Management**: uses React hooks to manage search state and watchlist persistence (local state).  

## UI / Responsiveness & Design Decisions
- **Minimalist Layout**: focus on search and results without distractions.  
- **Responsive TailwindCSS**: utility classes simplify scaling across screen sizes.  
- **Smooth Motion**: Motion used for transitions between result cards and pages.  
- **Clear Call to Actions**: buttons for adding/removing from watchlist are prominent.  

## Challenges & Learnings
- Integrating and handling rate-limited requests from the TMDB API.  
- Managing watchlist persistence within local state without backend support.  
- Designing intuitive navigation between multiple views using React Router.  
- Balancing simplicity of Tailwind utility classes with maintainable styling.  

## Future Improvements
- **Persistent Storage**: Save watchlist to browser localStorage or a backend service.  
- **User Accounts**: Enable sign-in to maintain personalized watchlists across devices.  
- **Advanced Filters**: Allow filtering search results by year, genre, or rating.  
- **Infinite Scroll or Pagination**: Improve browsing experience for large result sets.  
- **Accessibility Enhancements**: Improve keyboard navigation and screen reader support.  

## Screens & Visuals

### Landing Page
![Landing Page](https://raw.githubusercontent.com/Ashwin-S-Nambiar/MovieVault/main/public/screenshots/MovieVault.webp)

### Search Results
![Search Results](https://raw.githubusercontent.com/Ashwin-S-Nambiar/MovieVault/main/public/screenshots/MovieVault-1.webp)

### Movie Details
![Movie Details](https://raw.githubusercontent.com/Ashwin-S-Nambiar/MovieVault/main/public/screenshots/MovieVault-2.webp)

### Watchlist Page
![Watchlist](https://raw.githubusercontent.com/Ashwin-S-Nambiar/MovieVault/main/public/screenshots/MovieVault-3.webp)

### 404 Page
![Page Not Found](https://raw.githubusercontent.com/Ashwin-S-Nambiar/MovieVault/main/public/screenshots/MovieVault-4.webp)
