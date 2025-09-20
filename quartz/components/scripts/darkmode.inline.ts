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

// Enhanced theme switching with smooth animations
const switchThemeWithAnimation = async (newTheme: "light" | "dark") => {
  // Check if View Transitions API is supported for ultra-smooth transitions
  if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const transition = document.startViewTransition(() => {
      document.documentElement.setAttribute("saved-theme", newTheme)
      localStorage.setItem("theme", newTheme)
    })
    
    try {
      await transition.finished
    } catch (e) {
      // Fallback if view transition fails
      console.warn("View transition failed, using fallback:", e)
    }
  } else {
    // Fallback for browsers without View Transitions API
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }
  
  emitThemeChangeEvent(newTheme)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const currentTheme = document.documentElement.getAttribute("saved-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    switchThemeWithAnimation(newTheme)
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
