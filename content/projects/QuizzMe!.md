---
title: QuizzMe!
author: Ashwin S. Nambiar
date: 2024-09-19
tags: [projects, react, javascript, portfolio, experiments, quiz-app]
---

# QuizzMe!

A quiz-taking platform that fetches questions from [[Open Trivia DB]] and allows users to customize their quiz experience in terms of category, difficulty, type, number of questions. Includes responsive UI, theme toggle, animations, score feedback etc.

---

## Overview

QuizzMe! is a front-end only web app built with React and Vite. Users configure a quiz via multiple options (category, difficulty, number of questions, question type), then answer a set of trivia questions fetched from the Open Trivia DB API. After completing, they receive their score, and perfect scores trigger a confetti animation. The app includes dark / light mode support (persisted), smooth transitions, and checks for API availability before starting a quiz.  

Live: **[quizzme.ashwin.co.in](https://quizzme.ashwin.co.in)**  
Source code: **[GitHub](https://github.com/Ashwin-S-Nambiar/QuizzMe)**

---

## Goals & Problems Solved

- **Configurable Quiz Experience**: let users control category, difficulty, question type, and count.  
- **Reliability**: ensure the app detects if the Trivia DB API is unreachable (down or network issues) and handles gracefully.  
- **Quality UX**: responsive design for various devices, theme support, animations to make the experience polished.  
- **Correctness of Content**: decode HTML entities that Trivia DB returns in questions/answers so they render cleanly.  
- **Immediate Feedback & Engagement**: score reveal, and reward (confetti) for perfect score to motivate.

---

## Architecture & Tech Stack

| Layer | Technology / Library | Purpose |
|---|---|---|
| **Framework / Build** | [[React]], [[Vite]] | Component-based UI, fast dev server & build speeds. |
| **State / Hooks** | Built-in React state & hooks, plus **React-Use** for custom reusable hooks. |
| **Unique IDs** | Nano ID | For keying lists, handling unique identifiers. |
| **Data API** | [[Open Trivia DB]] | Source of quiz questions. |
| **HTML Entities Handling** | html-entities package | To decode HTML entity encodings in questions / answers. |
| **Visual / Animation** | [[CSS]] animations / transitions; React-Confetti; theme toggle transitions. |
| **Persistence** | localStorage | For storing theme preference etc. |
| **Responsive Design** | CSS3 + responsive layouts / breakpoints | For mobile / tablet / desktop usability. |

---

## Key Features & UX Flow

1. **Quiz Setup Screen**  
   - User selects number of questions, category, difficulty, type.  
   - Theme toggle and detection of API status check happen before allowing quiz to begin.  

2. **Fetching & Data Handling**  
   - On quiz start, fetch questions via API call (with the parameters).  
   - Decode HTML entities so punctuation / special chars show properly.  
   - Use unique IDs for options / answers to manage state.  

3. **Quiz Interaction**  
   - Present one question at a time (or all together?) with selectable options.  
   - On selecting answer, store whether correct.  

4. **Result / Score Reveal**  
   - At end, show score, highlight correct / incorrect answers.  
   - Trigger a **confetti animation** if perfect score.  

5. **Persistent Preferences**  
   - Theme choice saved in localStorage, so revisit has same theme.  

6. **Responsiveness and Accessibility**  
   - UI adjusts for screen sizes; inputs / buttons tappable on touch devices.  
   - Probably focus / hover states etc for usability.  

---

## Code Walkthrough & Notable Modules

Here are some of the modules / files that stand out:

- **`src/App.jsx` / main entry**: handles routing between quiz setup, quiz in progress, and result.  
- **Components**:  
    • *QuizSetup / Options* component: handles form inputs for selecting quiz parameters.  
    • *QuestionBoard* / *QuizQuestion* component(s): displays question, choices, handles selection.  
    • *ScoreBoard / Result* component: show summary, score, perhaps correct vs incorrect.  
- **Utility modules**:  
    • HTML-entities decoder function to sanitize API text.  
    • NanoID usage for keying, especially in mapping options.  
- **Hooks**: usage of React-Use for common hooks (possibly window / theme toggles, effects).  
- **API status check**: before starting quiz, a check to ensure Trivia DB is reachable (maybe fetching some status endpoint or simple fetch).  

---

## UI / Responsiveness & Design Decisions

- Clean, simple layout: minimal distractions.  
- Theme toggle (light / dark) with smooth transitions, for comfort of different users.  
- Animations: hover effects, clickable feedback, confetti for perfect scores makes the experience more engaging without going overboard.  

- Breakpoints: mobile small (~320px), mobile medium, tablet, laptop, large screens. Ensures readability and touch-friendly controls.  

- Use of HTML-entities package to avoid awkward rendering of entities like &quot;, &amp;, etc.

---

## Challenges & Learnings

- Handling HTML entities clearly: ensuring that all content from the API is decoded correctly, especially for special characters.  
- Managing asynchronous behavior: fetch latency, handling API errors, ensuring UI shows loading / error states.  
- State consistency: making sure selecting answers, going back/forward (if supported), and score tallying are bug-free.  
- Design balance: making features like confetti / animations engaging but not distracting or heavy, especially for users on lower bandwidth or mobile.  
- Responsiveness: ensuring layout works in smallest screens, touch interactions, readable font sizes.  

---

## Future Improvements

Here are areas you might consider expanding:

- **Accessibility improvements**: better keyboard navigation, ARIA attributes, color contrast audits.  
- **Pagination / One question per screen vs all together**: consider different modes (quiz flow).  
- **Timer mode**: give users timed quizzes.  
- **More feedback**: after each question, show correct answer / explanation.  
- **Persistence of quiz progress**: allow resume if user reloads or loses session.  
- **User accounts / scoring history**: store past quizzes, leaderboards.  
- **Offline support**: quiz caching, fallbacks.  
- **Performance optimization**: lazy-loading components, reducing bundle size etc.  

---

## Screens & Visuals

### Quiz Setup (Light Theme)

![Landing Page Light](https://github.com/user-attachments/assets/46b8d8c9-8b40-4c20-9668-057ec5d7abc9)

### Quiz Setup (Dark Theme)

![Landing Page Dark](https://github.com/user-attachments/assets/2e0fa692-1295-4915-84f2-45b47228e29e)

### Question in Progress

![Quiz Questions Light](https://github.com/user-attachments/assets/7d5bf1b9-809a-4d6d-81ac-8d0bff18f728)

### Quiz Result

![Score Reveal](https://github.com/user-attachments/assets/3d4080bc-e72e-4bed-b7d9-bdaffacdc20e)