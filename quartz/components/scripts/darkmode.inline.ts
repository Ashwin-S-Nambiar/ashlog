const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

// Add class to prevent transitions on page load
document.documentElement.classList.add("no-transition")
window.addEventListener("load", () => {
  // Remove the no-transition class after a brief delay to enable smooth transitions
  setTimeout(() => {
    document.documentElement.classList.remove("no-transition")
  }, 100)
})

// Spaceman-inspired animation utilities
const supportsViewTransitions = (): boolean => {
  return 'startViewTransition' in document
}

const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

const createCircleAnimation = (x: number, y: number, duration: number): void => {
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
      easing: "ease-in-out",
      pseudoElement: "::view-transition-new(root)",
    }
  )
}

// Enhanced theme switching with spaceman-style smooth animations
const switchThemeWithAnimation = async (newTheme: "light" | "dark", buttonElement?: HTMLElement) => {
  // Add transitioning class for visual feedback
  if (buttonElement) {
    buttonElement.classList.add("transitioning")
  }

  // Check if View Transitions API is supported for ultra-smooth transitions
  if (supportsViewTransitions() && !prefersReducedMotion() && buttonElement && document.startViewTransition) {
    try {
      const transition = document.startViewTransition(() => {
        document.documentElement.setAttribute("saved-theme", newTheme)
        localStorage.setItem("theme", newTheme)
      })

      // Get button position for circle animation origin
      const rect = buttonElement.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      // Create circle animation
      createCircleAnimation(x, y, 750)

      await transition.finished
    } catch (e) {
      // Fallback if view transition fails
      console.warn("View transition failed, using fallback:", e)
      document.documentElement.setAttribute("saved-theme", newTheme)
      localStorage.setItem("theme", newTheme)
    }
  } else {
    // Fallback for browsers without View Transitions API or reduced motion preference
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  // Remove transitioning class after animation
  if (buttonElement) {
    setTimeout(() => {
      buttonElement.classList.remove("transitioning")
    }, 750)
  }
  
  emitThemeChangeEvent(newTheme)
}

document.addEventListener("nav", () => {
  const switchTheme = (event: Event) => {
    const currentTheme = document.documentElement.getAttribute("saved-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    const buttonElement = event.currentTarget as HTMLElement
    switchThemeWithAnimation(newTheme, buttonElement)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    switchThemeWithAnimation(newTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
