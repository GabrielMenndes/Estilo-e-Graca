import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
  trigger?: string | Element
  start?: string
  end?: string
  once?: boolean
  y?: number
  opacity?: number
  duration?: number
  ease?: string
  delay?: number
  stagger?: number
}

export function useScrollAnimation(
  selector: string,
  options: ScrollAnimationOptions = {}
) {
  const {
    trigger,
    start = 'top 85%',
    end = 'bottom 20%',
    once = true,
    y = 40,
    opacity = 0,
    duration = 0.8,
    ease = 'power2.out',
    delay = 0,
    stagger = 0,
  } = options

  useGSAP(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          delay,
          stagger,
          scrollTrigger: {
            trigger: trigger || elements[0],
            start,
            end,
            once,
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [selector, trigger, start, end, once, y, opacity, duration, ease, delay, stagger])
}

export function useSectionTitleAnimation() {
  useScrollAnimation('.section-title', {
    y: 50,
    duration: 0.9,
    stagger: 0.15,
  })

  useScrollAnimation('.eyebrow', {
    y: 30,
    duration: 0.7,
    delay: 0.1,
  })

  useScrollAnimation('.section-text', {
    y: 30,
    duration: 0.7,
    delay: 0.2,
  })
}

export function useStaggeredAnimation(selector: string, options: ScrollAnimationOptions = {}) {
  const {
    y = 40,
    duration = 0.7,
    stagger = 0.1,
    delay = 0,
    ...rest
  } = options

  useScrollAnimation(selector, { y, duration, stagger, delay, ...rest })
}