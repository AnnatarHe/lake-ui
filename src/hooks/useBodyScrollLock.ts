import { useLayoutEffect } from 'react'

type Lock = { count: number, restore: () => void }
const locks = new WeakMap<HTMLElement, Lock>()

export default function useBodyScrollLock(isOpen: boolean) {
  useLayoutEffect(() => {
    if (!isOpen) return
    const body = document.body
    let lock = locks.get(body)
    if (!lock) {
      const style = body.style
      const ios = /iP(hone|ad|od)/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      const width = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
      const properties = ['overflow', ...(width ? ['padding-right'] : []), ...(ios ? ['position', 'top', 'left', 'right'] : [])]
      const saved = properties.map(name => [name, style.getPropertyValue(name), style.getPropertyPriority(name)])
      const x = window.scrollX
      const y = window.scrollY
      const padding = Number.parseFloat(getComputedStyle(body).paddingRight) || 0
      style.overflow = 'hidden'
      if (width) style.paddingRight = `${padding + width}px`
      // iOS does not consistently respect overflow:hidden on the body.
      if (ios) {
        style.position = 'fixed'
        style.top = `${-y}px`
        style.left = `${-x}px`
        style.right = '0'
      }
      lock = {
        count: 0,
        restore() {
          for (const [name, value, priority] of saved) {
            if (value) style.setProperty(name, value, priority)
            else style.removeProperty(name)
          }
          if (ios) window.scrollTo(x, y)
        },
      }
      locks.set(body, lock)
    }
    lock.count += 1
    locks.set(body, lock)
    return () => {
      lock.count -= 1
      if (lock.count === 0) {
        lock.restore()
        locks.delete(body)
      }
    }
  }, [isOpen])
}
