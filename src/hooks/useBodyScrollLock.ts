import { useEffect } from 'react'

const locks = new WeakMap<HTMLElement, { count: number, overflow: string }>()

export default function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return
    const body = document.body
    const lock = locks.get(body) ?? { count: 0, overflow: body.style.overflow }
    lock.count += 1
    locks.set(body, lock)
    body.style.overflow = 'hidden'

    return () => {
      lock.count -= 1
      if (lock.count === 0) {
        body.style.overflow = lock.overflow
        locks.delete(body)
      }
    }
  }, [isOpen])
}
