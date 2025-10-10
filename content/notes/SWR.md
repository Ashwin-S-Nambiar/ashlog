---
title: SWR
date: 2025-10-09
tags: [react, nextjs, data-fetching, caching, vercel]
---
**SWR** is a lightweight data fetching library for [[notes/Tech Stack/React]] developed by [[notes/Tech Stack/Next.js]]. It implements the **stale-while-revalidate** strategy, meaning it returns cached data immediately (stale) and then fetches fresh data in the background, ensuring both speed and accuracy.

## Key Features
- Instant UI updates with cached data  
- Automatic revalidation on focus or reconnect  
- Built-in caching and request deduplication  
- TypeScript support and middleware extensibility  

## Example
```js
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)
  if (error) return <div>Error loading</div>
  if (isLoading) return <div>Loading...</div>
  return <div>Hello, {data.name}</div>
}
```

## Purpose
SWR is ideal for client-side [[notes/API]] calls in Next.js apps where performance and data freshness are important.

**Docs:** [https://swr.vercel.app/](https://swr.vercel.app/)
