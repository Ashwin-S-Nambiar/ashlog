---
title: React
tags: [react, javascript, frontend, ui, library]
---
React is an **open-source [[notes/JavaScript]] library** for building user interfaces (UIs), primarily used for **[[notes/Single Page Applications]] (SPAs)**. It is maintained by **Meta (formerly Facebook)** along with a community of individual developers and companies.

## Key Features and Concepts
### Component-Based Architecture
React applications are built using **self-contained, reusable UI components**.  
- Encourages modularity and maintainability  
- Components can be composed to build complex UIs  
### Declarative Programming
Developers describe **what the UI should look like** for a given state, and React efficiently updates and renders it.  
### Virtual DOM
- React maintains a lightweight **in-memory representation** of the DOM.  
- When state changes, React updates the Virtual DOM first, then calculates the minimal set of changes to apply to the real DOM.  
- This approach significantly improves **performance**.  
### JSX (JavaScript XML)
- React uses **JSX syntax**, which lets you write HTML-like structures inside JavaScript.  
- Makes UI definition more **intuitive and integrated** with application logic.  
### Unidirectional Data Flow
- Data flows **one way**: from parent to child components via `props`.  
- Predictable data flow makes **debugging and state management** easier.  
### Hooks
- Introduced in **React 16.8**.  
- Enable using **state** and **lifecycle features** inside function components without needing class components.  
- Common hooks: `useState`, `useEffect`, `useContext`, etc.  

## Purpose
React simplifies building **interactive, dynamic, and data-driven UIs** by providing:  
- Efficient rendering with Virtual DOM  
- Predictable data flow  
- Reusable component model  
- Scalable architecture  

It is especially effective for applications where **data changes frequently**, making UI development more **efficient, scalable, and less prone to bugs**.
