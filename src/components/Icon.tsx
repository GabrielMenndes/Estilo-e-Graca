import { type ReactNode } from 'react'

export interface IconProps {
  name:
    | 'arrow'
    | 'check'
    | 'clock'
    | 'instagram'
    | 'location'
    | 'menu'
    | 'quote'
    | 'sparkle'
    | 'whatsapp'
    | 'x'
    | 'chevron'
    | 'plus'
    | 'star'
    | 'arrowDiagonal'
  className?: string
  'aria-hidden'?: boolean
}

export function Icon({
  name,
  className = 'size-5',
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    quote: <path d="M7 17H4a1 1 0 0 1-1-1v-4a5 5 0 0 1 5-5h1v3H8a2 2 0 0 0-2 2h1a2 2 0 0 1 0 4v1Zm10 0h-3a1 1 0 0 1-1-1v-4a5 5 0 0 1 5-5h1v3h-1a2 2 0 0 0-2 2h1a2 2 0 0 1 0 4v1Z" />,
    sparkle: (
      <>
        <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" />
        <path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M9 8.5c.3 2.7 1.8 4.2 4.5 4.8l1-1c.2-.2.5-.2.8-.1l2 .9" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    chevron: (
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    plus: (
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    star: (
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    arrowDiagonal: (
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  }

  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name] || paths.arrow}
    </svg>
  )
}

export default Icon