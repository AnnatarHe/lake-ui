'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface AvatarProps {
  src?: string | null
  /** Used for the image alt text and the initials fallback. */
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'rounded'
  ring?: 'none' | 'accent' | 'premium'
  /** Rendered instead of the initials when there is no usable image. */
  fallback?: ReactNode
  className?: string
}

const sizeClasses = {
  xs: 'size-6 text-[0.625rem]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-lg',
  xl: 'size-20 text-2xl',
}

export function initialsOf(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  const first = Array.from(words[0])[0] ?? ''
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] ?? '' : ''
  return (first + last).toUpperCase()
}

function Avatar({ src, name, size = 'md', shape = 'circle', ring = 'none', fallback, className }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const showImage = !!src && failedSrc !== src

  // An image that failed before hydration never fires onError on the client.
  useEffect(() => {
    const image = imageRef.current
    if (src && image?.complete && image.naturalWidth === 0) setFailedSrc(src)
  }, [src])

  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-lake-control'

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium',
        'bg-lake-accent-soft text-lake-accent-text',
        radius,
        sizeClasses[size],
        ring === 'accent' && 'ring-2 ring-lake-accent ring-offset-2 ring-offset-lake-surface',
        ring === 'premium' && 'ring-2 ring-lake-warning/70 ring-offset-2 ring-offset-lake-surface',
        className,
      )}
    >
      {showImage
        ? (
            <img
              ref={imageRef}
              src={src}
              alt={name}
              decoding='async'
              onError={() => setFailedSrc(src)}
              className='size-full object-cover'
            />
          )
        : (
            <span role='img' aria-label={name} className='inline-flex size-full items-center justify-center'>
              {fallback ?? <span aria-hidden='true'>{initialsOf(name)}</span>}
            </span>
          )}
    </span>
  )
}

export default Avatar
