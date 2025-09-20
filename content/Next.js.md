---
title: Next.js
tags: [nextjs, react, framework, javascript, web, frontend, fullstack]
---
**Next.js** is a **React framework** for building modern web applications with features like server-side rendering (SSR), static site generation (SSG), and API routes. It extends [[React]] to provide better performance, scalability, and developer experience.  

---

## Key Features

### Hybrid Rendering
Next.js allows you to choose between different rendering strategies:  
- **Static Site Generation (SSG):** Pages are generated at build time and served as static HTML.  
- **Server-Side Rendering (SSR):** Pages are generated on each request at runtime.  
- **Client-Side Rendering (CSR):** Standard [[React]] rendering in the browser.  

### API Routes
Next.js provides built-in support for creating backend API endpoints directly in the project, reducing the need for a separate backend for small apps.

### File-Based Routing
Pages are automatically mapped to files in the `pages/` directory.  
- Dynamic routes (`[id].js`) enable parameterized URLs.  
- Nested routes follow the folder structure.

### Image Optimization
The `<Image>` component automatically optimizes images for different devices, improving performance.

### CSS and Styling
Supports global styles, CSS Modules, and integration with [[CSS]] frameworks like Tailwind or styled-components.

### Fast Refresh
Provides instant feedback during development by preserving component state while editing.

### Internationalization
Built-in support for multiple locales and translations.

---

## Advantages
- Better SEO through SSR and SSG compared to pure [[Single Page Applications]]  
- Faster initial page loads due to pre-rendering  
- Full-stack capabilities with integrated API routes  
- Optimized developer workflow with file-based routing and Fast Refresh  

---

## Typical Use Cases
- Content-heavy websites (blogs, documentation, marketing pages)  
- E-commerce platforms that require SEO and dynamic content  
- Dashboards and web apps where hybrid rendering is beneficial  
- Full-stack applications combining frontend and lightweight APIs  

---

## Integration with Other Tools
- Works seamlessly with [[React]] and [[JavaScript]] (or [[TypeScript]])  
- Can be deployed easily to Vercel (its creators) or other platforms  
- Plays well with modern build tools and libraries, though it has its own bundling pipeline separate from [[Vite]]  

---

## Purpose
Next.js provides a **production-ready framework** on top of [[React]] that addresses performance, SEO, and scalability challenges while simplifying the developer experience. It bridges the gap between static websites and dynamic [[Web Development]] applications.
