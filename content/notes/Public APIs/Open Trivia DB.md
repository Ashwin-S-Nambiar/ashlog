---
title: Open Trivia DB
tags: [api, trivia, questions, database, opentdb]
---
## Overview
The **Open Trivia Database (OpenTDB)** is a free, community-maintained and [[notes/Public APIs|public]] trivia question API. It offers thousands of questions across diverse categories (general knowledge, science, history, movies, etc.) and difficulty levels, making it perfect for quiz apps, educational tools, and games.  

Docs: [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php)  

## Features
- Fetch random trivia questions  
- Filter questions by category, difficulty, and type (multiple-choice or true/false)  
- JSON responses for easy integration into apps  
- Token-based session support to prevent duplicate questions  
- Community-driven and constantly growing dataset  

## Usage
### Example: Fetch 10 random questions
```bash
GET https://opentdb.com/api.php?amount=10
```
### Example: Filtered by category and difficulty
```bash
GET https://opentdb.com/api.php?amount=5&category=18&difficulty=medium
```

## Advantages
* Completely free and open-source
* Large, varied question pool
* No API key required
* Session tokens help avoid repetition in quizzes

## Limitations
* Question set depends on community contributions and coverage may vary
* Some questions/answers may become outdated
* Limited to trivia/quiz use cases

## Purpose
OpenTDB is commonly used to power trivia games, quiz apps, and educational tools. In projects like [[projects/QuizzMe!]], it acts as the main data provider, simplifying quiz creation without requiring developers to manually curate large datasets.