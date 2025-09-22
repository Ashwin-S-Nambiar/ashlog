---
title: Quillify
author: Ashwin S. Nambiar
date: 2025-09-22
tags: [projects, nextjs, react, javascript, portfolio, experiments, blog-app]
---
## Overview
Quillify is a blogging web application that allows users to register, log in, and create blog posts with a WYSIWYG editor. It features secure authentication with [[notes/JWT]] and bcrypt, supports an admin panel for managing blogs and subscriptions, and offers responsive design optimized for all devices. As a full-stack project, it demonstrates integration of modern frontend frameworks, backend logic, and database persistence within [[notes/Web Development]].

Live: **[quillify.ashwin.co.in](https://quillify.ashwin.co.in/)**  
Source code: **[GitHub](https://github.com/Ashwin-S-Nambiar/Quillify)** 

## Goals & Problems Solved
- **Secure Authentication**: User registration and login with password hashing and token-based sessions.  
- **Rich Content Creation**: WYSIWYG editor allows formatting text, creating structured blog content.  
- **Responsive UI**: Accessible across desktops, tablets, and mobile devices.  
- **Smart Formatting**: Human-readable publish dates enhance readability.  
- **Admin Tools**: Admin dashboard for managing blogs and subscriptions.  
- **Feedback & Notifications**: Toast notifications improve interactivity and communication.  

## Architecture & Tech Stack
| Layer                 | Technology / Library     | Purpose                                                     |
| --------------------- | ------------------------ | ----------------------------------------------------------- |
| **Framework / Build** | [[notes/Next.js]], [[notes/React]], [[notes/JavaScript]] | Core frontend and backend framework for rendering and routing |
| **Styling**           | [[notes/TailwindCSS]], [[notes/CSS]] | Utility-first responsive styling and layout                 |
| **Database**          | [[notes/MongoDB]]                  | NoSQL database for flexible data storage                    |
| **Authentication**    | JWT, bcryptjs            | Secure login, registration, and password encryption         |
| **Hosting**           | Vercel                   | Deployment and continuous delivery platform                 |


## Key Features & UX Flow
1. **User Authentication**  
   - Login, registration, and password protection using JWT and bcrypt.  

2. **Blog Management**  
   - Create, update, and view blog posts using a rich text editor.  
   - Admin panel for managing all posts and subscriptions.  

3. **Subscriptions**  
   - Track and manage blog subscriptions through admin dashboard.  

4. **Responsive Design**  
   - Fully adaptive layout ensures usability across devices.  

5. **Notifications**  
   - Real-time toast notifications provide feedback for user actions.  

## Code Walkthrough & Notable Modules
- **`pages/`**: Next.js routing for blog pages, authentication, and admin dashboard.  
- **Components**:  
  • *Editor*: WYSIWYG editor for creating and editing blog posts.  
  • *PostCard*: Displays blog post summaries on the home page.  
  • *Admin Dashboard*: Manages blog entries and subscriptions.  
  • *Auth Forms*: Handles login and registration.  
- **API Routes**: Next.js [[notes/API]] routes handle authentication, CRUD operations, and database queries.  
- **Database Integration**: MongoDB collections for users, posts, and subscriptions.  
- **Security**: JWT-based authentication and bcrypt password hashing.  

## UI / Responsiveness & Design Decisions
- Minimalist design to highlight blog content.  
- TailwindCSS utilities ensure rapid iteration and mobile-first responsiveness.  
- Clear layout for admin tools without overwhelming the main blog experience.  
- Toast notifications enhance user experience with immediate feedback.  

## Challenges & Learnings
- Implementing secure authentication workflows with JWT and bcrypt.  
- Designing a database schema in MongoDB that balances flexibility with performance.  
- Integrating a WYSIWYG editor with [[notes/React]] while maintaining data consistency.  
- Building an admin panel that is functional yet simple to navigate.  
- Ensuring responsive layouts scale properly across devices.  

## Future Improvements
- **Media Uploads**: Support images and media embedding in blog posts.  
- **User Profiles**: Author pages with bios and published articles.  
- **Tagging & Categories**: Organize posts with tags and categories.  
- **Search & Filtering**: Add robust search for blogs and authors.  
- **Role-Based Access**: Differentiate admin and regular user capabilities.  
- **Dark Mode**: Theme toggle for improved readability.  

## Screens & Visuals
### Landing Page
![Landing Page](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/LandingPage.png)

### Adding Subscription
![Adding Subscription1](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AddingSubscription-1.png)
![Adding Subscription2](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AddingSubscription-2.png)

### Blog in Detail
![BlogInDetail](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/BlogDetailPage.png)

### Admin Login
![AdminLogin1](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminLoginPage-1.png)
![AdminLogin2](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminLoginPage-2.png)
![AdminLogin3](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminLoginPage-3.png)

### Adding New Blog
![AddNewBlog1](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminAddProductPage-1.png)
![AddNewBlog2](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminAddProductPage-2.png)
![AddNewBlog3](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminAddProductPage-3.png)
![AddNewBlog4](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminAddProductPage-4.png)
![AddNewBlog5](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminAddProductPage-5.png)

### All Blog Details
![BlogDetails](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminAllBlogs.png)

### All Subscription Details
![SubsDetails](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/AdminAllSubs.png)

### 404 Page
![404Page](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/404Page.png)

### MongoDB Structure
![MongoDB](https://raw.githubusercontent.com/Ashwin-S-Nambiar/Quillify/main/public/screenshots/MongoDB.png)
