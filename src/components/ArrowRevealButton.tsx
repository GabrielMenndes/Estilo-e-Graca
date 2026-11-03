import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Icon } from './Icon'

interface ArrowRevealButtonProps {
  label: string
  href?: string
  onClick?: () => void
  iconSide?: 'left' | 'right'
  variant?: 'bronze' | 'rose' | 'white' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  iconName?: 'arrow' | 'chevron' | 'plus' | 'whatsapp' | 'sparkle'
}

const colorVariants = {
  bronze: {
    fill: 'var(--color-bronze)',
    textColor: '#ffffff',
    hoverFill: '#765838',
    iconBackground: 'var(--color-rose)',
    iconColor: '#ffffff',
    strokeColor: 'transparent',
  },
  rose: {
    fill: 'var(--color-rose)',
    textColor: '#ffffff',
    hoverFill: '#a05a66',
    iconBackground: 'var(--color-bronze)',
    iconColor: '#ffffff',
    strokeColor: 'transparent',
  },
  white: {
    fill: '#ffffff',
    textColor: 'var(--color-charcoal)',
    hoverFill: 'var(--color-cream)',
    iconBackground: 'var(--color-bronze)',
    iconColor: '#ffffff',
    strokeColor: 'transparent',
  },
  outline: {
    fill: 'transparent',
    textColor: 'var(--color-bronze)',
    hoverFill: 'rgb(140 106 72 / 0.06)',
    iconBackground: 'var(--color-bronze)',
    iconColor: '#ffffff',
    strokeColor: 'rgb(140 106 72 / 0.4)',
  },
}

const sizeVariants = {
  sm: { padding: '12px 20px 12px 12px', gap: 8, badgeSize: 36, iconSize: 16, fontSize: '0.8rem' },
  md: { padding: '16px 32px 16px 16px', gap: 10, badgeSize: 44, iconSize: 18, fontSize: '0.8rem' },
  lg: { padding: '20px 40px 20px 20px', gap: 12, badgeSize: 52, iconSize: 20, fontSize: '0.8rem' },
}

export function ArrowRevealButton({
  label,
  href,
  onClick,
  iconSide = 'right',
  variant = 'bronze',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  iconName = 'arrow',
}: ArrowRevealButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const strokeRef = useRef<HTMLSpanElement>(null)
  const slotRef = useRef<HTMLSpanElement>(null)

  const colors = colorVariants[variant]
  const sizing = sizeVariants[size]
  const isLeft = iconSide === 'left'

  // State for measured positions
  const metrics = useRef({
    slotCenterX: 0,
    slotCenterY: 0,
    buttonWidth: 0,
    buttonHeight: 0,
    coverScale: 1,
    iconTravelX: 0,
  })

  // Measure layout and set initial positions
  useLayoutEffect(() => {
    const btn = buttonRef.current
    const badge = badgeRef.current
    const icon = iconRef.current
    const slot = slotRef.current
    const strokeEl = strokeRef.current

    if (!btn || !badge || !icon || !slot) return

    const measure = () => {
      const rect = btn.getBoundingClientRect()
      const slotRect = slot.getBoundingClientRect()

      if (!rect.width || !rect.height) return

      metrics.current.buttonWidth = rect.width
      metrics.current.buttonHeight = rect.height
      metrics.current.slotCenterX = slotRect.left - rect.left + slotRect.width / 2
      metrics.current.slotCenterY = slotRect.top - rect.top + slotRect.height / 2

      // Calculate cover scale for badge expansion
      const farX = Math.max(metrics.current.slotCenterX, rect.width - metrics.current.slotCenterX)
      const farY = Math.max(metrics.current.slotCenterY, rect.height - metrics.current.slotCenterY)
      const coverDistance = Math.hypot(farX, farY) * 2 * 1.02
      const badgeSize = sizing.badgeSize
      metrics.current.coverScale = coverDistance / badgeSize

      // Icon travel distance (from slot center to button center)
      metrics.current.iconTravelX = rect.width / 2 - metrics.current.slotCenterX

      // Set initial positions for badge and icon (at slot position)
      const badgeSizePx = badgeSize
      const badgeRadius = badgeSizePx / 2

      // Position badge at slot center
      badge.style.left = `${metrics.current.slotCenterX}px`
      badge.style.top = `${metrics.current.slotCenterY}px`
      badge.style.transform = 'translate(-50%, -50%) scale(1)'

      // Position icon at slot center (on top of badge)
      icon.style.left = `${metrics.current.slotCenterX}px`
      icon.style.top = `${metrics.current.slotCenterY}px`
      icon.style.transform = 'translate(-50%, -50%)'

      // Position stroke
      if (strokeEl) {
        const bWidth = 2
        strokeEl.style.borderRadius = `${Math.min(rect.width, rect.height) / 2 + bWidth}px`
      }
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(btn)
    ro.observe(slot)
    return () => ro.disconnect()
  }, [sizing.badgeSize, isLeft])

  // GSAP animation for hover enter
  const animateEnter = () => {
    if (!buttonRef.current || !badgeRef.current || !iconRef.current || !textRef.current) return

    const m = metrics.current

    // Animate badge expansion from slot position
    gsap.to(badgeRef.current, {
      scale: m.coverScale,
      duration: 0.46,
      ease: [0.44, 0, 0.56, 1],
    })

    // Animate icon movement from slot center to button center + rotation
    gsap.to(iconRef.current, {
      x: m.iconTravelX,
      rotation: 45,
      duration: 0.46,
      ease: [0.44, 0, 0.56, 1],
    })

    // Animate text shift
    gsap.to(textRef.current, {
      x: isLeft ? 8 : -8,
      duration: 0.46,
      ease: [0.44, 0, 0.56, 1],
    })
  }

  // GSAP animation for hover leave
  const animateLeave = () => {
    if (!badgeRef.current || !iconRef.current || !textRef.current) return

    gsap.to(badgeRef.current, {
      scale: 1,
      duration: 0.46,
      ease: [0.44, 0, 0.56, 1],
    })

    gsap.to(iconRef.current, {
      x: 0,
      rotation: 0,
      duration: 0.46,
      ease: [0.44, 0, 0.56, 1],
    })

    gsap.to(textRef.current, {
      x: 0,
      duration: 0.46,
      ease: [0.44, 0, 0.56, 1],
    })
  }

  // Press animation
  const pressScale = (scale: number) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale, duration: 0.1, ease: 'power2.out' })
    }
    if (strokeRef.current) {
      gsap.to(strokeRef.current, { scale, duration: 0.1, ease: 'power2.out' })
    }
  }

  // Cleanup on unmount
  useGSAP(() => {
    return () => {
      if (badgeRef.current) gsap.killTweensOf(badgeRef.current)
      if (iconRef.current) gsap.killTweensOf(iconRef.current)
      if (textRef.current) gsap.killTweensOf(textRef.current)
      if (buttonRef.current) gsap.killTweensOf(buttonRef.current)
      if (strokeRef.current) gsap.killTweensOf(strokeRef.current)
    }
  }, [])

  const Tag = href ? 'a' : 'button'

  // Detect external URLs and add proper attributes
  const isExternal = href?.startsWith('http://') || href?.startsWith('https://')
  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!disabled) {
        pressScale(0.97)
        setTimeout(() => pressScale(1), 100)
      }
    }
  }

  const handleFocus = () => {
    if (buttonRef.current) {
      buttonRef.current.style.outline = '2px solid var(--color-rose)'
      buttonRef.current.style.outlineOffset = '4px'
    }
  }

  const handleBlur = () => {
    if (buttonRef.current) {
      buttonRef.current.style.outline = 'none'
    }
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        position: 'relative',
        overflow: 'visible',
      }}
      className={className}
    >
      <Tag
        ref={buttonRef}
        href={href}
        type={href ? undefined : type}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={disabled ? undefined : animateEnter}
        onMouseLeave={disabled ? undefined : animateLeave}
        onPointerDown={() => !disabled && pressScale(0.97)}
        onPointerUp={() => !disabled && pressScale(1)}
        onPointerLeave={() => !disabled && pressScale(1)}
        {...linkProps}
        style={{
          boxSizing: 'border-box',
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: isLeft ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          gap: sizing.gap,
          padding: sizing.padding,
          background: colors.fill,
          border: colors.strokeColor ? `2px solid ${colors.strokeColor}` : 'none',
          borderRadius: '9999px',
          overflow: 'hidden',
          position: 'relative',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          opacity: disabled ? 0.5 : 1,
          fontSize: sizing.fontSize,
          fontWeight: 700,
          letterSpacing: '0.035em',
          minWidth: 80,
          minHeight: 40,
          boxShadow: variant !== 'outline' ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
          transition: 'box-shadow 180ms ease',
        }}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {/* Layer 1: Text label */}
        <span
          ref={textRef}
          style={{
            position: 'relative',
            zIndex: 1,
            color: colors.textColor,
            opacity: 1,
            transition: 'transform 0.46s cubic-bezier(0.44, 0, 0.56, 1)',
          }}
        >
          {label}
        </span>

        {/* Badge slot - reserves space in layout */}
        <span
          ref={slotRef}
          aria-hidden="true"
          style={{
            flex: 'none',
            width: sizing.badgeSize,
            height: sizing.badgeSize,
          }}
        />

        {/* Layer 2: Badge (expanding circle) - positioned via JS at slot position */}
        <div
          ref={badgeRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            zIndex: 2,
            width: sizing.badgeSize,
            height: sizing.badgeSize,
            borderRadius: '50%',
            background: colors.iconBackground,
            transformOrigin: 'center',
            pointerEvents: 'none',
            willChange: 'transform',
            // Initial position set by useLayoutEffect
            left: 0,
            top: 0,
          }}
        />

        {/* Layer 3: Icon container - positioned via JS at slot position */}
        <div
          ref={iconRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            zIndex: 3,
            width: sizing.iconSize,
            height: sizing.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.iconColor,
            pointerEvents: 'none',
            transformOrigin: 'center',
            willChange: 'transform',
            // Initial position set by useLayoutEffect
            left: 0,
            top: 0,
          }}
        >
          <Icon name={iconName} className={`size-[${sizing.iconSize}px]`} />
        </div>
      </Tag>

      {/* Stroke overlay - sibling of button */}
      <span
        ref={strokeRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -2,
          zIndex: 4,
          boxSizing: 'border-box',
          pointerEvents: 'none',
          border: colors.strokeColor ? `2px solid ${colors.strokeColor}` : 'none',
          borderRadius: '9999px',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}

export default ArrowRevealButton