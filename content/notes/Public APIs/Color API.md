---
title: Color API
author: Ashwin S. Nambiar
date: 2025-09-27
tags: [api, web-development, color, design, notes]
---
## Overview
The Color API is a [[notes/Public APIs|public api]] provides programmatic access to color information and tools for generating color schemes. It supports multiple harmony modes and returns results in structured JSON. It is widely used for applications requiring palette generation, theming, and design automation.

Docs: **[https://www.thecolorapi.com/docs](https://www.thecolorapi.com/docs)**  

## Features
- Input base color in HEX, RGB, HSL, or named format.  
- Generate color schemes in modes such as Monochrome, Complement, Analogic, and Triad.  
- Provides detailed color data including HEX, RGB, HSL, and contrast values.  
- JSON-based responses enable seamless integration with frontend applications.  

## Usage
- **Endpoint**: `https://www.thecolorapi.com/scheme`  
- **Parameters**:  
  - `hex` – Base color in hex format  
  - `mode` – Harmony type (monochrome, analogic, triad, etc.)  
  - `count` – Number of colors in the scheme  

### Example Request
```bash
https://www.thecolorapi.com/scheme?hex=0047AB&mode=triad&count=5
```

### Example Response (Simplified)

```json
{
  "colors": [
    { "hex": { "value": "#0047AB" } },
    { "hex": { "value": "#AB0047" } },
    { "hex": { "value": "#47AB00" } }
  ]
}
```

## Integration
* Can be used in JavaScript projects with `fetch()` or Axios.
* Commonly applied in design tools, palette generators, and educational projects.
* Easily connects with frontend frameworks such as [[notes/React]] or [[notes/Next.js]].
