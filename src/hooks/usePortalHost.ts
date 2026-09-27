import { useEffect, useState } from 'react'

/**
 * Resolves a portal host after mount so server rendering stays safe. Falls back
 * to `document.body` when no element matches `selector`.
 */
export default function usePortalHost(selector: string) {
  const [host, setHost] = useState<HTMLElement | null>(null)
  useEffect(() => {
    setHost(document.querySelector<HTMLElement>(selector) ?? document.body)
  }, [selector])
  return host
}
