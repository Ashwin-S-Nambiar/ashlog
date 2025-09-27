---
title: Imgflip
tags: [api, memes, imgflip, rest]
---
## Overview
The **Imgflip API** is a [[notes/REST]]ful [[notes/Public APIs|public]] JSON API that enables developers to integrate meme generation and template retrieval directly into applications. It provides endpoints to fetch popular meme templates, caption images or GIFs, and even generate AI-based memes. This makes it ideal for apps or projects centered around humor, memes, or user-generated content.  

Website: [https://imgflip.com/api](https://imgflip.com/api)  

## Features
- Fetch popular meme templates  
- Caption memes by supplying template ID and text inputs  
- Caption animated GIFs (premium only)  
- Search meme templates by keyword (premium)  
- Generate memes with AI using Imgflip’s model or OpenAI GPT (premium)  
- Auto-caption memes with AI (automeme)  

## Usage
### Example: Fetch meme templates
```bash
# Returns an array of meme templates
GET https://api.imgflip.com/get_memes
````

### Example: Caption meme

```bash
POST https://api.imgflip.com/caption_image
  -d template_id=112126428
  -d username=your_username
  -d password=your_password
  -d text0="Top text"
  -d text1="Bottom text"
```

## Advantages
* Quick access to trending meme templates
* Easy JSON-based integration for frontend apps
* AI-powered meme generation for more creative use cases

## Limitations
* Many advanced endpoints (search, AI meme, automeme, GIFs) are **premium only**
* Generated memes are **publicly accessible**; no private option
* Content is not curated filtering may be necessary for safe apps
* Free tier can be throttled if abused

## Pricing
* **Free tier**: Access to basic meme captioning & template fetching
* **Premium**: \~\$9.99/month, unlocks watermark-free memes, full search, GIF support, and AI meme generation

## Purpose
Imgflip is widely used in meme generators such as [[projects/Meme Generator]], social media bots, and interactive applications where humor and viral content are central.

