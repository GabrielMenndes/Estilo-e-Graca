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

/**
 * Animação scroll-linked (scrub) para títulos de seção.
 * O texto revela-se progressivamente conforme o scroll.
 */
export function useSectionTitleScrollLinked() {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Seleciona todos os títulos de seção
      const sectionTitles = document.querySelectorAll('.section-title')
      const eyebrows = document.querySelectorAll('.eyebrow')
      const sectionTexts = document.querySelectorAll('.section-text')

      if (!sectionTitles.length) return

      // Para cada seção, criar timeline sincronizada com scroll
      document.querySelectorAll('section[id]').forEach((section) => {
        const id = section.id
        if (!id) return

        const title = section.querySelector('.section-title')
        const eyebrow = section.querySelector('.eyebrow')
        const text = section.querySelector('.section-text')
        const cards = section.querySelectorAll('.service-card, article, blockquote, .auto-rows-\\[230px\\] > a, .md\\:auto-rows-\\[300px\\] > a, #unidades article, #depoimentos blockquote')

        if (!title) return

        // Timeline para a seção
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
            toggleActions: 'play reverse play reverse',
          }
        })

        // Eyebrow - aparece primeiro
        if (eyebrow) {
          tl.fromTo(eyebrow,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            0
          )
        }

        // Título - revela com stagger nas linhas
        tl.fromTo(title,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.1
        )

        // Texto descritivo
        if (text) {
          tl.fromTo(text,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
            0.2
          )
        }

        // Cards/itens com stagger
        if (cards.length) {
          tl.fromTo(cards,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
            0.3
          )
        }
      })
    })

    return () => ctx.revert()
  }, [])
}

/**
 * Efeito scroll-linked (scrub) avançado para textos principais do hero.
 * Parallax em camadas + reveal de texto sincronizado.
 */
export function useHeroScrollLinkedAnimation() {
  useGSAP(() => {
    const heroSection = document.querySelector('#inicio')
    const heroTitle = document.querySelector('.hero-title')
    const heroText = document.querySelector('.hero-text')
    const heroBadge = document.querySelector('.hero-badge')
    const heroButtons = document.querySelector('.hero-buttons')
    const heroSocial = document.querySelector('.hero-social')
    const heroImage = document.querySelector('.hero-image')
    const heroCard = document.querySelector('.hero-card')
    const statItems = document.querySelectorAll('.stat-item')

    if (!heroSection || !heroTitle || !heroText) return

    const ctx = gsap.context(() => {
      // ===== TIMELINE PRINCIPAL DO HERO (scrub) =====
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        }
      })

      // Badge - sobe mais rápido (parallax foreground)
      if (heroBadge) {
        heroTl.fromTo(heroBadge,
          { y: 0 },
          { y: -100, ease: 'none' },
          0
        )
      }

      // Título principal - parallax médio
      heroTl.fromTo(heroTitle,
        { y: 0 },
        { y: -80, ease: 'none' },
        0
      )

      // Texto - parallax mais lento
      heroTl.fromTo(heroText,
        { y: 0 },
        { y: -40, ease: 'none' },
        0
      )

      // Botões - parallax sutil
      if (heroButtons) {
        heroTl.fromTo(heroButtons,
          { y: 0 },
          { y: -20, ease: 'none' },
          0
        )
      }

      // Social - parallax muito sutil
      if (heroSocial) {
        heroTl.fromTo(heroSocial,
          { y: 0 },
          { y: -10, ease: 'none' },
          0
        )
      }

      // Imagem - parallax oposto (desce levemente)
      if (heroImage) {
        heroTl.fromTo(heroImage,
          { y: 0 },
          { y: 30, ease: 'none' },
          0
        )
      }

      // Card flutuante - parallax suave
      if (heroCard) {
        heroTl.fromTo(heroCard,
          { y: 0 },
          { y: -50, ease: 'none' },
          0
        )
      }

      // ===== TIMELINE DE REVEAL (toggleActions) - para entrada inicial =====
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
          once: true,
        }
      })

      revealTl
        .fromTo('.hero-badge', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
        .fromTo('.hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.1)
        .fromTo('.hero-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.2)
        .fromTo('.hero-buttons > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.3)
        .fromTo('.hero-social', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.4)
        .fromTo('.hero-image', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.2)
        .fromTo('.hero-card', { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, 0.5)
        .fromTo('.stat-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 }, 0.3)

      // ===== PARALLAX CONTÍNUO NOS STATS (scrub separado) =====
      if (statItems.length) {
        statItems.forEach((stat, index) => {
          gsap.fromTo(stat,
            { y: 0 },
            {
              y: -30 + (index * 5), // variação sutil
              ease: 'none',
              scrollTrigger: {
                trigger: heroSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1 + (index * 0.1),
              }
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])
}

/**
 * Efeito de texto "split reveal" - cada palavra/linha anima individualmente no scroll.
 * Usa GSAP SplitText-like approach sem plugin extra.
 */
export function useTextSplitReveal(selector: string = '.section-title') {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(selector)

      elements.forEach((el) => {
        // Guardar texto original
        const originalText = el.textContent || ''
        if (!originalText.trim()) return

        // Dividir em palavras
        const words = originalText.split(' ').filter(w => w.length > 0)
        if (words.length <= 1) return

        // Substituir por spans
        el.innerHTML = words.map((word, i) =>
          `<span class="split-word" style="display: inline-block; opacity: 0; transform: translateY(30px);" data-index="${i}">${word}</span>`
        ).join(' ')

        const wordElements = el.querySelectorAll('.split-word')

        gsap.fromTo(wordElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true,
            }
          }
        )
      })
    })

    return () => ctx.revert()
  }, [selector])
}

/**
 * Pinning de seção com animação interna (para seções importantes).
 */
export function useSectionPin(sectionId: string, animationConfig?: { duration?: number }) {
  useGSAP(() => {
    const section = document.querySelector(`#${sectionId}`)
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${animationConfig?.duration || 1000}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        // markers: true, // descomente para debug
      })
    })

    return () => ctx.revert()
  }, [sectionId])
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

// Re-export para compatibilidade
export function useSectionTitleAnimation() {
  useSectionTitleScrollLinked()
}