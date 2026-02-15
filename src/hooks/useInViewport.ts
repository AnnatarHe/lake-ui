import { useCallback, useEffect, useRef } from 'react'

interface UseInViewportOptions {
  rootMargin?: string
  threshold?: number | number[]
}

function useInViewport(
  callback: () => void,
  options: UseInViewportOptions = {},
) {
  const callbackRef = useRef(callback)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (sentinelRef.current) {
        sentinelRef.current = null
      }

      if (!node) return
      if (typeof IntersectionObserver === 'undefined') return

      sentinelRef.current = node

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callbackRef.current()
            }
          })
        },
        {
          rootMargin: options.rootMargin ?? '0px',
          threshold: options.threshold ?? 0,
        },
      )

      observer.observe(node)

      return () => {
        observer.disconnect()
      }
    },
    [options.rootMargin, options.threshold],
  )

  return ref
}

export default useInViewport
