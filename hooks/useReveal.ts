'use client'

import { useEffect, useRef } from 'react'

/**
 * useReveal — attaches an IntersectionObserver to all `.reveal` elements
 * inside `containerRef`. Works reliably on Safari iOS:
 *  - Uses threshold: 0 (not 0.1) to fire as soon as 1px is visible
 *  - Applies a small delay so Safari has finished layout before observing
 *  - Falls back to making all elements visible if IntersectionObserver is absent
 */
export function useReveal() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Immediate fallback — no IntersectionObserver (very old browsers)
    if (!('IntersectionObserver' in window)) {
      container.querySelectorAll<HTMLElement>('.reveal')
        .forEach((el) => el.classList.add('visible'))
      return
    }

    let observer: IntersectionObserver

    // Delay gives Safari iOS time to finish the first paint / layout pass
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target) // stop watching once visible
            }
          })
        },
        {
          threshold: 0,
          rootMargin: '0px 0px -40px 0px',
        }
      )

      container.querySelectorAll<HTMLElement>('.reveal')
        .forEach((el) => observer.observe(el))
    }, 300) // Safari iOS a besoin de plus de temps pour finaliser le layout

    return () => {
      clearTimeout(timer)
      observer?.disconnect()
    }
  }, [])

  return containerRef
}