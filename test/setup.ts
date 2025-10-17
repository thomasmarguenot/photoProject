/* eslint-disable @typescript-eslint/no-explicit-any */
// Minimal polyfill for IntersectionObserver used by framer-motion in tests
class IntersectionObserverStub {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

(globalThis as any).IntersectionObserver =
  (globalThis as any).IntersectionObserver || IntersectionObserverStub;

export {};
