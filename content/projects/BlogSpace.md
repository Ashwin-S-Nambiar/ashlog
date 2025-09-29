---
title: BlogSpace
author: Ashwin S. Nambiar
date: 2025-09-29
tags: [projects, javascript, html, css, blogging, portfolio, experiments]
---
## Overview
**BlogSpace** is a simple blogging platform built with vanilla web technologies that allows users to both **write** and **display** blogs in a clean, user-friendly interface. The project focuses on providing a minimal yet functional blogging experience within [[notes/Web Development]].

Live: **[blogspace.ashwin.co.in](https://blogspace.ashwin.co.in)**  
Source code: **[GitHub](https://github.com/Ashwin-S-Nambiar/Blogspace)**

## Goals & Problems Solved
- Provide a simple platform for users to write and publish their own blogs.  
- Enable blog display in a structured, easy-to-read format.  
- Focus on clean design and straightforward user flow without overengineering.  
- Showcase practical application of core web technologies (HTML, CSS, JavaScript).  

## Architecture & Tech Stack
| Layer        | Technology / Library                                 | Purpose                                 |
| ------------ | ---------------------------------------------------- | --------------------------------------- |
| **Frontend** | [[notes/Tech Stack/HTML]], [[notes/Tech Stack/CSS]], [[notes/Tech Stack/JavaScript]] | Structure, styling, and interactivity    |
| **Hosting**  | Vercel                                               | Deployment and live hosting              |

## Key Features & UX Flow
1. **Blog Display**  
   - Users can view existing blogs in a clean and readable format.  

2. **Blog Writing**  
   - Built-in editor lets users create and publish their own blog posts.  

3. **Validation & Publishing**  
   - Ensures proper input validation before allowing post submission.  

4. **Dynamic Interface**  
   - Posts are instantly reflected on the UI once published.  

## Code Walkthrough & Notable Modules
- **index.html**: Serves as the main entry point with blog display and editor sections.  
- **styles.css**: Handles layout, typography, and responsiveness.  
- **script.js**: Implements blog creation logic, form validation, and UI updates.  
- **assets/screenshots/**: Contains visuals of various screens for documentation.  

## UI / Responsiveness & Design Decisions
- Simple two-section layout: one for browsing blogs, another for writing.  
- Responsive design ensures accessibility across desktops and mobile devices.  
- Minimalist color palette to keep the focus on blog content.  

## Challenges & Learnings
- Designing a seamless user flow for both reading and writing blogs in the same interface.  
- Handling DOM updates dynamically to reflect new posts.  
- Ensuring responsiveness without using frameworks.  

## Future Improvements
- Add persistent storage (localStorage or backend integration).  
- Include categories, tags, and search functionality.  
- Add support for rich text formatting (bold, italics, links).  
- User authentication for personalized blogging.  

## Screens & Visuals
### Landing Page
![Landing Page](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Blogspace/main/assets/screenshots/BlogSpace-1.png)

### Full Interface
![Full Interface](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Blogspace/main/assets/screenshots/BlogSpace-Full.png)

### Footer
![Footer](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Blogspace/main/assets/screenshots/BlogSpace-2.png)

### Publish Post
![Publish Post](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Blogspace/main/assets/screenshots/BlogSpace-3.png)

### Post Validation
![Post Validation](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Blogspace/main/assets/screenshots/BlogSpace-4.png)

### Writing a Post
![Writing a Post](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Blogspace/main/assets/screenshots/BlogSpace-5.png)

### New Post Added
![New Post Added](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Blogspace/main/assets/screenshots/BlogSpace-6.png)
