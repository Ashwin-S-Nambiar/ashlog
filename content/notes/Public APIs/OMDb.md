---
title: OMDb
tags: [api, movies, web, javascript, projects]
---
## Overview
The OMDb API is a [[notes/Public APIs|public api]] allows developers to query a large database of movie and TV data, making it easy to build applications such as watchlists, review sites, and recommendation systems. It returns structured data in JSON format, which can be consumed directly by [[notes/JavaScript]] applications and frameworks like [[notes/React]].  

Website: [https://www.omdbapi.com/](https://www.omdbapi.com/)  

## Features
- Search movies by title  
- Fetch detailed information about movies, TV series, or episodes  
- Retrieve metadata such as release year, genre, director, actors, plot, ratings, and posters  
- Support for both free and paid API keys (paid keys enable higher request limits and additional data)  

## Usage
### Authentication
Access requires an API key. After registering on the OMDb site, include the key in all requests using the `apikey` parameter.

### Example Query
```bash
# Search by movie title
https://www.omdbapi.com/?t=Inception&apikey=your_api_key
````

### Sample JSON Response
```json
{
  "Title": "Inception",
  "Year": "2010",
  "Rated": "PG-13",
  "Released": "16 Jul 2010",
  "Runtime": "148 min",
  "Genre": "Action, Adventure, Sci-Fi",
  "Director": "Christopher Nolan",
  "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
  "Plot": "A thief who steals corporate secrets ...",
  "Poster": "https://someposterlink.jpg",
  "imdbRating": "8.8"
}
```

## Common Parameters
* `t` – Search by exact title
* `s` – Search by keyword (returns multiple results)
* `i` – Search by IMDb ID
* `y` – Filter results by year
* `plot` – Short or full plot descriptions (`short`/`full`)
* `apikey` – Your unique API key

## Advantages
* Lightweight and easy to integrate into frontend projects
* Extensive data coverage across movies and TV series
* JSON format simplifies use in \[\[notes/JavaScript]] apps


## Limitations
* Free API keys are rate-limited (usually 1,000 requests per day)
* Requires careful handling of errors when titles are not found
* Poster image links may sometimes be broken or missing


## Purpose
The OMDb API is widely used for applications that need to display or manage movie information. In portfolio projects like [[projects/MovieVault]], it powers search, detailed movie descriptions, and watchlist features by serving as the core data provider.
