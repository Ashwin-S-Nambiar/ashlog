export declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K] | UIEvent): void
    
    // View Transitions API support
    startViewTransition?(callback?: () => void | Promise<void>): ViewTransition
  }
  
  interface ViewTransition {
    finished: Promise<void>
    ready: Promise<void>
    updateCallbackDone: Promise<void>
    skipTransition(): void
  }
  
  interface Window {
    spaNavigate(url: URL, isBack: boolean = false)
    addCleanup(fn: (...args: any[]) => void)
  }
}
