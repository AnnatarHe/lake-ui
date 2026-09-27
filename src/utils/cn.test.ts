import { describe, expect, it } from 'vitest'
import { cn } from './index'

describe('cn', () => {
  it('merges theme scales against Tailwind defaults', () => {
    expect(cn('rounded-lg', 'rounded-lake-control')).toBe('rounded-lake-control')
    expect(cn('rounded-lake-panel', 'rounded-none')).toBe('rounded-none')
    expect(cn('shadow-sm', 'shadow-lake-card')).toBe('shadow-lake-card')
    expect(cn('shadow-lake-overlay', 'shadow-none')).toBe('shadow-none')
    expect(cn('backdrop-blur-md', 'backdrop-blur-lake')).toBe('backdrop-blur-lake')
  })

  it('keeps shadow colors separate from shadow sizes', () => {
    expect(cn('shadow-lake-card', 'shadow-black/10')).toBe('shadow-lake-card shadow-black/10')
  })

  it('merges token colors and lets later classes win', () => {
    expect(cn('bg-lake-surface text-lake-fg', 'bg-white', { hidden: false })).toBe('text-lake-fg bg-white')
    expect(cn('text-sm text-lake-fg-muted', 'text-lake-danger')).toBe('text-sm text-lake-danger')
  })
})
