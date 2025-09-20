---
title: Single Page Applications
tags: [spa, web, javascript, frontend, architecture]
---

A **Single Page Application (SPA)** is a web application that loads a single HTML page and dynamically updates its content using [[JavaScript]], without requiring a full page reload.

---

## Key Characteristics

### Dynamic Content Loading
SPAs fetch and render content asynchronously, avoiding full page reloads.

### Routing
Client-side routing enables seamless navigation within the application without server round trips.

### API-Driven
SPAs typically rely on APIs (often [[REST]] or [[GraphQL]]) to fetch and send data.

### State Management
SPAs maintain application state on the client side, often using libraries such as **[[Redux]]**, **[[Zustand]]**, or **MobX**.

---

## Advantages
- Faster navigation and improved user experience  
- Reduced server load once initial page is loaded  
- Smooth, app like interactions  

---

## Disadvantages
- Larger initial load time  
- SEO challenges due to content being rendered client-side  
- Increased complexity in state management and routing  

---

## Examples
- Gmail  
- Google Docs  
- Facebook  
- Twitter  

---

## Purpose
SPAs aim to deliver **faster, more fluid user experiences** by avoiding full-page reloads and making the browser behave more like a native application.
