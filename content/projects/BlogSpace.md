---
title: BlogSpace
author: Ashwin S. Nambiar
date: 2026-09-28
updated: 2026-09-28
tags: [projects, javascript, html, css, blogging, markdown, portfolio]
---
## Overview
BlogSpace is a rack of short posts with a writer built in. Browse 251 posts from [DummyJSON](https://dummyjson.com/docs/posts) by tag, search or likes, open one to read its comments, and write your own in Markdown with a live proof beside it. Your posts, drafts, likes and comments stay on your device. It is built with [[notes/Tech Stack/HTML]], [[notes/Tech Stack/CSS]] and [[notes/Tech Stack/JavaScript]], with no framework and no build step.

The first version was an exercise from my time with [[notes/Scrimba]]: a form that posted to Scrimba's copy of JSONPlaceholder, over a feed of five Latin placeholder posts. The API echoed a new post without saving it, so a reload took it away. This rebuild keeps the idea small and framework free, reads real posts, keeps yours, and prints the whole thing like a risograph zine.

Live: **[blogspace.ashwin.co.in](https://blogspace.ashwin.co.in)**  
Source code: **[Explore Repo](https://github.com/Ashwin-S-Nambiar/Blogspace)**  

## Goals & Problems Solved
- **Posts That Stay**: What you write, like and comment is kept on your device, and goes out and comes back in as Markdown.
- **Real Content**: 251 English posts with authors, tags, likes, views and comments, instead of Latin filler.
- **A Look of Its Own**: Two inks on plain stock, and a cover printed for every post, since posts come without pictures.
- **Writing That Feels Like Printing**: A live proof while you write, and the print run when you publish.
- **Nothing Jumps**: No layout shift on load, on any screen from a 320 px phone up.

## Architecture & Tech Stack
| Layer              | Technology / Library                                                                                         | Purpose                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Markup / Style** | [[notes/Tech Stack/HTML]], [[notes/Tech Stack/CSS]]                                                           | The rack, the post page, the writer, view transitions            |
| **Script**         | [[notes/Tech Stack/JavaScript]] ES modules, no build step                                                     | Routing by query string, rendering, the writer, the print run    |
| **Data**           | [DummyJSON](https://dummyjson.com/docs/posts) posts, users and comments                                       | The feed, fetched once and kept on the device for six hours      |
| **Storage**        | localStorage                                                                                                  | Your posts, drafts, likes, comments, byline and the sound toggle |
| **Offline**        | A service worker                                                                                              | The app and fonts on the device; the saved feed opens offline    |
| **Sound**          | Web Audio API                                                                                                 | The print drums, the thump, likes and taps, with a mute toggle   |
| **Type / Icons**   | [Anybody](https://fonts.google.com/specimen/Anybody), [Literata](https://fonts.google.com/specimen/Literata), [Spline Sans Mono](https://fonts.google.com/specimen/Spline+Sans+Mono), [Phosphor](https://phosphoricons.com) | Self-hosted fonts with metric-matched fallbacks, an icon sprite |
| **Hosting**        | Vercel                                                                                                        | Static files with a real 404                                     |

## Key Features & UX Flow
1. **The Rack**
   - Every post as a cover, its number, the author, a read time, the title, an excerpt, its tags, comments and likes. More load as you scroll.
   - All, Yours and Drafts tabs, a row of every tag with its count, a search that looks through titles, text, tags and authors as you type, and latest, most liked or most read.

2. **Reading**
   - Tap a card and its cover and title grow into their places on the post page. Going back plays the same move in reverse and lands you where you left the rack.
   - The post is set large with a drop cap, with its views, words and author, the comments from DummyJSON and a box to add your own, and the next and previous posts.
   - Like, share (the share sheet on phones, a copied link elsewhere) or save the post as a `.md` file.

3. **Writing**
   - A title, up to five tags with suggestions from the ones already in use, and the post in Markdown, with a toolbar and `cmd` or `ctrl` + `b`, `i` and `k`.
   - The proof beside it shows the post as it will print, cover and all. On phones, Write and Proof are two tabs.
   - Drafts save as you type. Editing a published post keeps a draft of the edit until you update it.

4. **The Print Run**
   - Publishing lays the pink pass on your new cover, then the blue one, and lands it with a thump.
   - Your posts are numbered after the last one in the feed and marked Yours. Edit or delete them, with undo.

5. **Keys, Sounds, Markdown Files**
   - `n` to write, `/` to search, `j` and `k` for next and previous, `l` to like, `s` to share, `e` to edit, `esc` to go back, and `?` for the list.
   - Export all your posts in one Markdown file with front matter, and import `.md` files back in.

## Code Walkthrough & Notable Modules
- **`index.html`**: the page, the halftone patterns and the icon sprite. `404.html` is the same page with its own title.
- **js/**:
  • *main.js*: routes from the query string (`?post=`, `?write`, `?edit=`, `?tab=`, `?tag=`, `?q=`), the rack, the post page, the writer, toasts, keys and view transitions.
  • *api.js*: DummyJSON: the feed, authors and comment counts in one go, cached on the device, and each post's comments.
  • *cover.js*: the two-ink covers, generated from each post's id so the same post always gets the same one.
  • *md.js*: a small Markdown renderer that escapes everything first and only allows safe links.
  • *store.js*: your posts, drafts, likes and comments in localStorage, kept in step across tabs.
  • *sound.js*, *tip.js*: Web Audio and tooltips.

## UI / Responsiveness & Design Decisions
- **A Riso Zine**: Self publishing on paper at its loudest. Medium blue for all the text and fluorescent pink for the loud parts, on a natural stock with a fibre grain.
- **Generated Covers**: The first letter of the title (skipping the and a) in one ink, a shape in the other, solid, halftone or ruled. The pink pass sits a couple of pixels off register, like a real riso print.
- **Inks Never Mix in the Chrome**: Blue over pink turns purple, so only the covers overprint; the wordmark and icon lay blue on top.
- **Typography**: Anybody, squeezed down its width axis like a poster face, for the wordmark, titles and covers. Literata for reading, and Spline Sans Mono for numbers, tags and labels.
- **One Motion Both Ways**: Opening a post and going back are the same view transition in reverse, and the browser's own scroll restoration is off so nothing jumps first.
- **No Dark Mode**: It's printed paper.
- **Every Screen**: One column on phones, up to four on desktop, and the post page puts the cover beside the text when there is room. Checked at 15 sizes from 320 px to 2560 px.
- **Nothing Jumps**: Self-hosted fonts with metric-matched fallbacks, a fade in once they're ready, and loading placeholders that hold the same space. Layout shift measures 0.

## Challenges & Learnings
- A cover for every post with nothing but its id and title: a seeded random generator picks the ink, shape, fill and offset, so the rack looks varied and a post never changes.
- Making opening a post the exact mirror of going back: both sides of the transition need the shared name, and the browser has to stop restoring scroll before the snapshot.
- Back links after a run of next and previous posts: history state counts how far back the run started and names where it goes.
- A Markdown renderer with no library that can't be used to inject HTML: escape first, then build, and only allow http, https and mailto links.
- Zero layout shift while a 250-post feed loads: a cached copy paints at once, and placeholders hold a full screen until the first load.

## Future Improvements
- **Sync**: Posts that follow you between devices, with a link instead of an account.
- **Pictures**: Images in posts, printed in the same two inks.
- **A Reading List**: Posts saved to come back to.

## Screens & Visuals

### Home
![The rack: the BlogSpace wordmark, tabs, a search box, a row of tags and four posts with blue and pink halftone covers](./assets/blogspace-home.webp)

### A Post
![A post page: the cover and its views, words and author on the left, and the title, text with a pink drop cap and tags on the right](./assets/blogspace-post.webp)

### Comments
![The comments under a post, one from DummyJSON and one of your own, with the box to add another and the next and previous posts](./assets/blogspace-comments.webp)

### Writing
![The writer: a title, tag chips, suggested tags, the formatting toolbar and Markdown on the left, and the printed proof with its cover on the right](./assets/blogspace-writing.webp)

### Tags
![Posts tagged love, sorted by most liked, with the love tag highlighted in the tag row](./assets/blogspace-tags.webp)

### Your Posts
![The Yours tab with one post marked Yours, and buttons to import and export Markdown](./assets/blogspace-yours.webp)

### Shortcuts
![The shortcuts dialog over the rack: keys to write, search, move between posts, like, share, edit, publish and go back](./assets/blogspace-shortcuts.webp)

### 404
![A misprinted cover with a big 4 and the line this page did not make the print run](./assets/blogspace-404.webp)
