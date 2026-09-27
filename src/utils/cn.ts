import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge extension that recognises the theme.css scales, so
 * `rounded-lake-control` conflicts with `rounded-lg`, `shadow-lake-card` with
 * `shadow-sm`, and `backdrop-blur-lake` with `backdrop-blur-md`.
 * Color tokens (`bg-lake-surface`, `text-lake-fg`) already merge by default.
 */
export const lakeMergeConfig = {
  extend: {
    theme: {
      radius: ['lake-control', 'lake-panel'],
      shadow: ['lake-card', 'lake-overlay'],
      blur: ['lake'],
      animate: ['lake-indeterminate'],
    },
  },
}

export const lakeMerge = extendTailwindMerge(lakeMergeConfig)

export function cn(...inputs: ClassValue[]) {
  return lakeMerge(clsx(inputs))
}
