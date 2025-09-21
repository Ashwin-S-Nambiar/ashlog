---
title: Imgflip
tags: [api, memes, imgflip, rest]
---
The **Imgflip** [[notes/API]] is a RESTful JSON API designed to let developers integrate meme generation and template fetching into their apps. You can retrieve popular meme templates, create captioned memes or GIFs, search the meme database, and even use AI-powered meme generation.

### Key Features & Endpoints
| Endpoint              | Method | What it does                                                                                                           | Notes / Limitations                                                                                                                 |
| --------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `GET /get_memes`      | GET    | Returns an array of popular meme templates.                                                              | Public & free. Number/order of memes can change                                                                    |
| `POST /caption_image` | POST   | Caption a static meme template. You supply template ID, text boxes, etc.                                | All images are publicly accessible via URL; watermark removal & advanced options are premium.                       |
| `POST /caption_gif`   | POST   | Caption an animated GIF template.                                                                       | Premium only.                                                                                                       |
| `POST /search_memes`  | POST   | Search meme templates by text query.                                                                  | Premium only (first free quota then usage-based cost).                                                               |
| `POST /get_meme`      | POST   | Get a meme by its ID. Useful when you have a template ID and want its details.                          | Premium-only.                                                                                                       |
| `POST /automeme`      | POST   | Auto-caption one of the top \~2,048 meme templates given just a text input. AI choice for the best fit. | Premium-only, usage quotas.                                                                                        |
| `POST /ai_meme`       | POST   | Fully generate a meme using AI (either Imgflip’s model or OpenAI GPT).                               | Premium-only; content not curated so may include vulgar or unsuitable content out of the box. Filtering recommended. |

### Pricing & Access
* **Free tier**: Many basic endpoints and operations are free. There’s no hard request limit, but they can throttle/block in case of abuse.
* **Premium tier** (\~ **US\$9.99/month**): Unlocks advanced features (like watermark-free images, searching the full meme database, captioning GIFs, AI-based meme generation). Additional per-request charges may apply for usage beyond included limits.

### Important Notes & Caveats
* Memes/images created are **publicly accessible** via URL; there is **no private** meme option.
* When using advanced endpoints (AI/automeme, search), content may not be curated—vulgar or inappropriate content could show up. If building a consumer-facing app, you’ll likely need to add your own filtering.
* If doing non-trivial usage, create & use your own Imgflip account (rather than a shared or example account), to avoid hitting limits or account restrictions.

### Links
* API Docs: [Imgflip API](https://imgflip.com/api)
* Terms & Privacy (for usage / content limits): see Terms on Imgflip site.

