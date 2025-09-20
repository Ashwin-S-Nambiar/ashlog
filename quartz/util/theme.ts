export interface ColorScheme {
  light: string
  lightgray: string
  gray: string
  darkgray: string
  dark: string
  secondary: string
  tertiary: string
  highlight: string
  textHighlight: string
}

interface Colors {
  lightMode: ColorScheme
  darkMode: ColorScheme
}

export type FontSpecification =
  | string
  | {
      name: string
      weights?: number[]
      includeItalic?: boolean
    }

export interface Theme {
  typography: {
    title?: FontSpecification
    header: FontSpecification
    body: FontSpecification
    code: FontSpecification
  }
  cdnCaching: boolean
  colors: Colors
  fontOrigin: "googleFonts" | "local"
}

export type ThemeKey = keyof Colors

const DEFAULT_SANS_SERIF =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
const DEFAULT_MONO = "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace"

export function getFontSpecificationName(spec: FontSpecification): string {
  if (typeof spec === "string") {
    return spec
  }

  return spec.name
}

function formatFontSpecification(
  type: "title" | "header" | "body" | "code",
  spec: FontSpecification,
) {
  if (typeof spec === "string") {
    spec = { name: spec }
  }

  const defaultIncludeWeights = type === "header" ? [400, 700] : [400, 600]
  const defaultIncludeItalic = type === "body"
  const weights = spec.weights ?? defaultIncludeWeights
  const italic = spec.includeItalic ?? defaultIncludeItalic

  const features: string[] = []
  if (italic) {
    features.push("ital")
  }

  if (weights.length > 1) {
    const weightSpec = italic
      ? weights
          .flatMap((w) => [`0,${w}`, `1,${w}`])
          .sort()
          .join(";")
      : weights.join(";")

    features.push(`wght@${weightSpec}`)
  }

  if (features.length > 0) {
    return `${spec.name}:${features.join(",")}`
  }

  return spec.name
}

export function googleFontHref(theme: Theme) {
  const { header, body, code } = theme.typography
  const headerFont = formatFontSpecification("header", header)
  const bodyFont = formatFontSpecification("body", body)
  const codeFont = formatFontSpecification("code", code)

  return `https://fonts.googleapis.com/css2?family=${headerFont}&family=${bodyFont}&family=${codeFont}&display=swap`
}

export function googleFontSubsetHref(theme: Theme, text: string) {
  const title = theme.typography.title || theme.typography.header
  const titleFont = formatFontSpecification("title", title)

  return `https://fonts.googleapis.com/css2?family=${titleFont}&text=${encodeURIComponent(text)}&display=swap`
}

export interface GoogleFontFile {
  url: string
  filename: string
  extension: string
}

const fontMimeMap: Record<string, string> = {
  truetype: "ttf",
  woff: "woff",
  woff2: "woff2",
  opentype: "otf",
}

export async function processGoogleFonts(
  stylesheet: string,
  baseUrl: string,
): Promise<{
  processedStylesheet: string
  fontFiles: GoogleFontFile[]
}> {
  const fontSourceRegex =
    /url\((https:\/\/fonts.gstatic.com\/.+(?:\/|(?:kit=))(.+?)[.&].+?)\)\sformat\('(\w+?)'\);/g
  const fontFiles: GoogleFontFile[] = []
  let processedStylesheet = stylesheet

  let match
  while ((match = fontSourceRegex.exec(stylesheet)) !== null) {
    const url = match[1]
    const filename = match[2]
    const extension = fontMimeMap[match[3].toLowerCase()]
    const staticUrl = `https://${baseUrl}/static/fonts/${filename}.${extension}`

    processedStylesheet = processedStylesheet.replace(url, staticUrl)
    fontFiles.push({ url, filename, extension })
  }

  return { processedStylesheet, fontFiles }
}

// Spaceman-inspired animation utilities
export interface AnimationConfig {
  x: number
  y: number
  duration: number
  easing: string
}

export const supportsViewTransitions = (): boolean => {
  return typeof window !== 'undefined' && 'startViewTransition' in document
}

export const prefersReducedMotion = (): boolean => {
  return typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const createCircleAnimation = (config: AnimationConfig): void => {
  if (typeof window === 'undefined') return
  
  const { x, y, duration, easing } = config

  // Calculate the distance to each corner of the viewport
  const topLeft = Math.hypot(x, y)
  const topRight = Math.hypot(window.innerWidth - x, y)
  const bottomLeft = Math.hypot(x, window.innerHeight - y)
  const bottomRight = Math.hypot(window.innerWidth - x, window.innerHeight - y)

  // Find the maximum distance to ensure animation covers the entire viewport
  const maxRadius = Math.max(topLeft, topRight, bottomLeft, bottomRight)

  // Create dynamic animation for the specific button position
  document.documentElement.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
    },
    {
      duration,
      easing,
      pseudoElement: '::view-transition-new(root)',
    }
  )
}

export function joinStyles(theme: Theme, ...stylesheet: string[]) {
  return `
${stylesheet.join("\n\n")}

:root {
  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};
  --textHighlight: ${theme.colors.lightMode.textHighlight};

  --titleFont: "${getFontSpecificationName(theme.typography.title || theme.typography.header)}", ${DEFAULT_SANS_SERIF};
  --headerFont: "${getFontSpecificationName(theme.typography.header)}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${getFontSpecificationName(theme.typography.body)}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${getFontSpecificationName(theme.typography.code)}", ${DEFAULT_MONO};
  
  /* Spaceman-inspired theme animation settings */
  --theme-transition-duration: 750ms;
  --theme-transition-easing: ease-in-out;
}

/* Spaceman-inspired view transition animations for modern theme switching */
/* Base styles for smooth view transitions */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* Prevent transitions on page load to avoid flash of unstyled content */
.no-transition,
.no-transition *,
.no-transition *::before,
.no-transition *::after {
  transition: none !important;
  animation: none !important;
  will-change: auto !important;
}

/* Synchronized theme transitions for all elements */
* {
  transition: 
    background-color var(--theme-transition-duration) var(--theme-transition-easing),
    color var(--theme-transition-duration) var(--theme-transition-easing),
    border-color var(--theme-transition-duration) var(--theme-transition-easing),
    fill var(--theme-transition-duration) var(--theme-transition-easing),
    stroke var(--theme-transition-duration) var(--theme-transition-easing),
    box-shadow var(--theme-transition-duration) var(--theme-transition-easing) !important;
}

/* Enhanced transitions for specific element groups */
html,
body {
  transition: 
    background-color var(--theme-transition-duration) var(--theme-transition-easing),
    color var(--theme-transition-duration) var(--theme-transition-easing);
}

/* Text and interactive elements */
h1, h2, h3, h4, h5, h6,
p, span, div, a, li, td, th,
button, input, textarea, select {
  transition: 
    color var(--theme-transition-duration) var(--theme-transition-easing),
    background-color var(--theme-transition-duration) var(--theme-transition-easing),
    border-color var(--theme-transition-duration) var(--theme-transition-easing) !important;
}

/* Layout containers */
article, main, section, header, footer, nav,
.page, .content, .container {
  transition: 
    background-color var(--theme-transition-duration) var(--theme-transition-easing),
    border-color var(--theme-transition-duration) var(--theme-transition-easing) !important;
}

/* SVG and icons */
svg, svg * {
  transition: 
    fill var(--theme-transition-duration) var(--theme-transition-easing),
    stroke var(--theme-transition-duration) var(--theme-transition-easing) !important;
}

:root[saved-theme="dark"] {
  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
  --textHighlight: ${theme.colors.darkMode.textHighlight};
}

/* Spaceman-inspired View Transitions API animations for ultra-smooth theme switching */
@supports (view-transition-name: none) {
  /* Base view transition configuration */
  ::view-transition-group(root) {
    animation-duration: var(--theme-transition-duration);
    animation-timing-function: var(--theme-transition-easing);
  }
  
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: var(--theme-transition-duration);
    animation-timing-function: var(--theme-transition-easing);
  }

  /* Default circle animation for theme transitions */
  ::view-transition-new(root) {
    animation-name: theme-circle-in;
  }

  ::view-transition-old(root) {
    animation-name: theme-circle-out;
  }
}

/* Keyframes for circle animation (will be dynamically overridden by JavaScript) */
@keyframes theme-circle-in {
  from {
    clip-path: circle(0px at var(--circle-x, 50%) var(--circle-y, 50%));
  }
  to {
    clip-path: circle(200vmax at var(--circle-x, 50%) var(--circle-y, 50%));
  }
}

@keyframes theme-circle-out {
  from {
    clip-path: circle(200vmax at var(--circle-x, 50%) var(--circle-y, 50%));
  }
  to {
    clip-path: circle(0px at var(--circle-x, 50%) var(--circle-y, 50%));
  }
}

/* Fallback animation for browsers without View Transitions */
@media (prefers-reduced-motion: no-preference) {
  .theme-transitioning {
    animation: theme-fade var(--theme-transition-duration) var(--theme-transition-easing);
  }
}

@keyframes theme-fade {
  0% { opacity: 1; }
  50% { opacity: 0.8; }
  100% { opacity: 1; }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  :root {
    --theme-transition-duration: 0.1s;
  }
  
  *,
  *::before,
  *::after {
    transition-duration: 0.1s !important;
    animation-duration: 0.1s !important;
  }
  
  ::view-transition-group(root),
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.1s !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    transition-duration: 0.05s !important;
  }
}
`
}
