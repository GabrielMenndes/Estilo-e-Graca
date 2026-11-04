import { useState, type ReactNode, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRevealButton } from './components/ArrowRevealButton'
import { VideoIntro } from './components/VideoIntro'

gsap.registerPlugin(ScrollTrigger)

const whatsappUrl =
  'https://wa.me/?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20no%20Salão%20Estilo%20%26%20Graça.'

const images = {
  hero: 'https://images.unsplash.com/photo-1636153279424-cb5d1e00f5a2?auto=format&fit=crop&w=1400&q=90',
  specialist:
    'https://images.unsplash.com/photo-1709292681252-9bd979d13af6?auto=format&fit=crop&w=1000&q=88',
  blonde:
    'https://images.unsplash.com/photo-1554519934-e32b1629d9ee?auto=format&fit=crop&w=900&q=88',
  brunette:
    'https://images.unsplash.com/photo-1535579710123-3c0f261c474e?auto=format&fit=crop&w=900&q=88',
  gloss:
    'https://images.unsplash.com/photo-1681561248415-58f48ed63046?auto=format&fit=crop&w=900&q=88',
  salon:
    'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1100&q=88',
  salonTwo:
    'https://images.unsplash.com/photo-1626383137804-ff908d2753a2?auto=format&fit=crop&w=1100&q=88',
  longHair:
    'https://images.unsplash.com/photo-1584103208051-6d190fa0e065?auto=format&fit=crop&w=900&q=88',
}

function Icon({
  name,
  className = 'size-5',
}: {
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
  className?: string
}) {
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
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      aria-label="Salão Estilo & Graça — início"
      className="group flex items-center gap-3"
      href="#inicio"
    >
      <span className="logo-shine relative grid h-14 w-16 shrink-0 place-items-center overflow-hidden rounded-full md:h-16 md:w-[72px]">
        <img
          alt=""
          className="h-full w-full rounded-full object-contain shadow-[0_4px_4px_0_rgba(221,168,176,0.25),inset_0_4px_4px_0_rgb(221,168,176)]"
          src={`${import.meta.env.BASE_URL}assets/logo-estilo-graca-transparent.png`}
        />
      </span>
      <span className="leading-none">
        <strong className={`font-display block text-lg font-medium md:text-xl ${light ? 'text-white' : 'text-charcoal'}`}>
          Salão Estilo <i className="font-normal text-rose">&</i> Graça
        </strong>
        <span
          className={`mt-1.5 block text-[8px] font-bold uppercase tracking-[0.2em] md:text-[9px] ${
            light ? 'text-white/55' : 'text-bronze'
          }`}
        >
          Estética • Bem-estar • Cabelo
        </span>
      </span>
    </a>
  )
}

function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string
  title: ReactNode
  text?: string
  centered?: boolean
}) {
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {text && <p className="section-text mt-5 text-base leading-7 text-muted md:text-lg">{text}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
    ['Início', '#inicio'],
    ['Sobre', '#sobre'],
    ['Serviços', '#servicos'],
    ['Unidades', '#unidades'],
    ['Depoimentos', '#depoimentos'],
    ['Contato', '#contato'],
  ]

  const services = [
    {
      number: '01',
      title: 'Alisamento Especializado',
      text: 'Técnicas personalizadas para fios alinhados, leves e com movimento — sem abrir mão da integridade capilar.',
      tag: 'Saúde do fio em 1º lugar',
      image: images.brunette,
    },
    {
      number: '02',
      title: 'Mechas & Loiros Saudáveis',
      text: 'Iluminação sob medida para valorizar seu tom de pele, com diagnóstico, proteção e acabamento sofisticado.',
      tag: 'Balayage • Morenas iluminadas',
      image: images.blonde,
    },
    {
      number: '03',
      title: 'Tratamentos & Reconstrução',
      text: 'Protocolos exclusivos que devolvem força, maciez e brilho para cabelos que pedem cuidado profundo.',
      tag: 'Cronograma • Brilho espelhado',
      image: images.gloss,
    },
  ]

  const [showSite, setShowSite] = useState(false)

  // ===== ANIMAÇÕES SCROLL-LINKED (GSAP ScrollTrigger) =====

  // Hero: Parallax em camadas + Reveal inicial
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
      // TIMELINE PRINCIPAL - Parallax contínuo (scrub)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        }
      })

      if (heroBadge) {
        heroTl.fromTo(heroBadge, { y: 0 }, { y: -100, ease: 'none' }, 0)
      }
      heroTl.fromTo(heroTitle, { y: 0 }, { y: -80, ease: 'none' }, 0)
      heroTl.fromTo(heroText, { y: 0 }, { y: -40, ease: 'none' }, 0)
      if (heroButtons) {
        heroTl.fromTo(heroButtons, { y: 0 }, { y: -20, ease: 'none' }, 0)
      }
      if (heroSocial) {
        heroTl.fromTo(heroSocial, { y: 0 }, { y: -10, ease: 'none' }, 0)
      }
      if (heroImage) {
        heroTl.fromTo(heroImage, { y: 0 }, { y: 30, ease: 'none' }, 0)
      }
      if (heroCard) {
        heroTl.fromTo(heroCard, { y: 0 }, { y: -50, ease: 'none' }, 0)
      }

      // TIMELINE DE REVEAL INICIAL (toggleActions)
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

      // Stats parallax contínuo
      statItems.forEach((stat, index) => {
        gsap.fromTo(stat, { y: 0 }, {
          y: -30 + (index * 5),
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1 + (index * 0.1),
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // Seções: Timeline scrub por seção + Split text reveal
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Split text reveal para títulos
      const splitTitles = (selector: string) => {
        document.querySelectorAll(selector).forEach((el) => {
          const originalText = el.textContent || ''
          if (!originalText.trim()) return
          const words = originalText.split(' ').filter(w => w.length > 0)
          if (words.length <= 1) return
          el.innerHTML = words.map((word, i) =>
            `<span class="split-word" style="display: inline-block; opacity: 0; transform: translateY(30px);" data-index="${i}">${word}</span>`
          ).join(' ')
          const wordElements = el.querySelectorAll('.split-word')
          gsap.fromTo(wordElements, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05,
            scrollTrigger: {
              trigger: el, start: 'top 80%', end: 'bottom 20%',
              toggleActions: 'play none none reverse', once: true,
            }
          })
        })
      }

      splitTitles('.hero-title')
      splitTitles('.section-title')

      // Timeline scrub para cada seção
      document.querySelectorAll('section[id]').forEach((section) => {
        const title = section.querySelector('.section-title')
        const eyebrow = section.querySelector('.eyebrow')
        const text = section.querySelector('.section-text')
        const cards = section.querySelectorAll('.service-card, article, blockquote, .auto-rows-\\[230px\\] > a, .md\\:auto-rows-\\[300px\\] > a, #unidades article, #depoimentos blockquote')
        if (!title) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
            toggleActions: 'play reverse play reverse',
          }
        })

        if (eyebrow) {
          tl.fromTo(eyebrow, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
        }
        tl.fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.1)
        if (text) {
          tl.fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.2)
        }
        if (cards.length) {
          tl.fromTo(cards, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.3)
        }
      })
    })
    return () => ctx.revert()
  }, [])

  // Staggered animations (entrada simples)
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.hero-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.hero-buttons > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.4,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.hero-social', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.5,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.hero-image', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.hero-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.6,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.stat-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.1,
        scrollTrigger: { trigger: '#inicio', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.service-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15, delay: 0.2,
        scrollTrigger: { trigger: '#servicos', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('#unidades article', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15, delay: 0.2,
        scrollTrigger: { trigger: '#unidades', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('#depoimentos blockquote', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '#depoimentos', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
      gsap.fromTo('.auto-rows-\\[230px\\] > a, .md\\:auto-rows-\\[300px\\] > a', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.2,
        scrollTrigger: { trigger: '#transformacoes', start: 'top 85%', toggleActions: 'play none none none', once: true }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <VideoIntro onComplete={() => setShowSite(true)} transitionTimestamp={5} />
      {showSite && (
        <div className="min-h-screen overflow-x-hidden bg-cream text-charcoal">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal/8 bg-cream/92 backdrop-blur-xl">
        <div className="shell flex h-20 items-center justify-between lg:h-24">
          <Logo />
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <a className="nav-link" href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <ArrowRevealButton
            label="Agendar horário"
            href={whatsappUrl}
            iconName="arrow"
            variant="bronze"
            size="sm"
            className="hidden lg:inline-flex"
            iconSide="right"
          />
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="grid size-11 place-items-center rounded-full border border-charcoal/15 lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            <Icon name={menuOpen ? 'x' : 'menu'} />
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Navegação móvel" className="border-t border-charcoal/8 bg-cream px-5 py-5 lg:hidden">
            <div className="flex flex-col">
              {navItems.map(([label, href]) => (
                <a
                  className="border-b border-charcoal/8 py-4 font-medium"
                  href={href}
                  key={label}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <ArrowRevealButton
                label="Agendar horário"
                href={whatsappUrl}
                iconName="arrow"
                variant="bronze"
                size="md"
                className="mt-5 w-full"
                iconSide="right"
              />
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative min-h-[760px] pt-28 md:pt-36" id="inicio">
          <div className="pointer-events-none absolute -left-40 top-36 size-[420px] rounded-full bg-rose/8 blur-3xl" />
          <div className="shell grid items-center gap-12 pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-24">
            <div className="relative z-10 pt-8 lg:pt-0">
              <div className="hero-badge mb-7 inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-rose shadow-soft">
                <Icon className="size-4" name="sparkle" />
                Referência em beleza há mais de 20 anos
              </div>
              <h1 className="hero-title font-display max-w-3xl text-[clamp(3.25rem,6vw,5.65rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                Cabelos que traduzem sua <span className="italic text-rose">melhor versão.</span>
              </h1>
              <p className="hero-text mt-7 max-w-xl text-lg leading-8 text-muted md:text-xl">
                Especialistas em alisamentos e mechas em Camaçari. Beleza com segurança, elegância e respeito à saúde dos seus fios.
              </p>
              <div className="hero-buttons mt-9 flex flex-col gap-3 sm:flex-row">
                <ArrowRevealButton
                  label="Agendar meu horário"
                  href={whatsappUrl}
                  iconName="whatsapp"
                  variant="bronze"
                  size="lg"
                  className="flex-1 sm:flex-initial"
                  iconSide="left"
                />
                <ArrowRevealButton
                  label="Conhecer serviços"
                  href="#servicos"
                  iconName="arrow"
                  variant="outline"
                  size="lg"
                  className="flex-1 sm:flex-initial"
                  iconSide="right"
                />
              </div>
              <div className="hero-social mt-9 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[images.blonde, images.brunette, images.longHair].map((image, index) => (
                    <img
                      alt=""
                      className="size-10 rounded-full border-2 border-cream object-cover"
                      key={image}
                      src={image}
                      style={{ objectPosition: index === 0 ? 'center' : 'top' }}
                    />
                  ))}
                </div>
                <div>
                  <div aria-label="5 de 5 estrelas" className="text-sm tracking-[0.08em] text-bronze">
                    ★★★★★
                  </div>
                  <p className="mt-1 text-xs font-semibold text-charcoal/70">+7 mil histórias transformadas</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[580px] lg:mx-0">
              <div className="absolute -right-8 -top-8 hidden h-28 w-28 border-r border-t border-bronze/40 md:block" />
              <div className="hero-image relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-rose/10 shadow-image">
                <img
                  alt="Mulher com cabelos longos, escuros e brilhantes"
                  className="h-full w-full object-cover object-top"
                  src={images.hero}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent p-7 pt-28 text-white">
                  <p className="font-display text-2xl italic">“Seu cabelo, sua identidade.”</p>
                </div>
              </div>
              <div className="hero-card absolute -bottom-7 -left-4 max-w-[245px] rounded-2xl border border-white/70 bg-white/95 p-5 shadow-card backdrop-blur md:-left-10">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rose/10 text-rose">
                    <Icon name="check" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">Diagnóstico personalizado</p>
                    <p className="mt-1 text-xs leading-5 text-muted">Cada fio é único. Cada cuidado também.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Nossos números" className="relative z-10 bg-charcoal text-white">
          <div className="shell grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {[
              ['+20', 'Anos de experiência'],
              ['2', 'Unidades em Camaçari'],
              ['+7 mil', 'Clientes satisfeitas'],
              ['100%', 'Foco na saúde capilar'],
            ].map(([value, label]) => (
              <div className="stat-item px-4 py-8 text-center md:px-8 md:py-10" key={label}>
                <strong className="font-display text-3xl font-medium text-rose-light md:text-4xl">{value}</strong>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55 md:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-space" id="sobre">
          <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute -bottom-5 -left-5 h-full w-full rounded-t-[12rem] border border-bronze/35" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-2xl bg-rose/10">
                <img
                  alt="Retrato editorial representando cuidado e beleza capilar"
                  className="h-full w-full object-cover object-top"
                  src={images.specialist}
                />
              </div>
              <div className="absolute bottom-8 right-[-0.5rem] rounded-l-2xl bg-rose px-6 py-5 text-white shadow-card md:right-[-2rem]">
                <p className="font-display text-3xl font-medium">20+</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">Anos de dedicação</p>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Sobre Sheila Santos"
                title={
                  <>
                    A especialista por trás da sua <em className="font-normal text-rose">transformação</em>
                  </>
                }
              />
              <p className="section-text mt-7 text-base leading-8 text-muted">
                Sheila Santos construiu uma trajetória marcada por técnica, escuta e paixão. Especialista em alisamentos, mechas e tratamentos personalizados, ela acredita que um resultado bonito começa pelo respeito à história de cada cabelo.
              </p>
              <p className="section-text mt-4 text-base leading-8 text-muted">
                Ao longo de mais de duas décadas, aperfeiçoou protocolos que unem transformação e preservação — para que você saia do salão se sentindo mais confiante, sem abrir mão da saúde dos fios.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Avaliação individual dos fios', 'Técnicas atualizadas e seguras', 'Produtos profissionais', 'Acompanhamento pós-serviço'].map(
                  (item) => (
                    <div className="flex items-center gap-3 text-sm font-semibold" key={item}>
                      <span className="grid size-7 place-items-center rounded-full bg-rose/10 text-rose">
                        <Icon className="size-4" name="check" />
                      </span>
                      {item}
                    </div>
                  ),
                )}
              </div>
              <ArrowRevealButton
                label="Converse com nossa equipe"
                href={whatsappUrl}
                iconName="arrow"
                variant="bronze"
                size="sm"
                className="mt-9 w-fit"
                iconSide="right"
              />
            </div>
          </div>
        </section>

        <section className="section-space bg-white" id="servicos">
          <div className="shell">
            <SectionHeading
              centered
              eyebrow="Experiências Estilo & Graça"
              text="Técnica, produtos de alto desempenho e um olhar atento para entregar resultados que combinam com você."
              title={
                <>
                  Nossos serviços <em className="font-normal text-rose">exclusivos</em>
                </>
              }
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {services.map((service) => (
                <article className="service-card group" key={service.title}>
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={service.image} />
                    <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-full bg-white/90 font-display text-lg text-bronze backdrop-blur">
                      {service.number}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <span className="mb-4 w-fit rounded-full bg-cream px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-bronze">
                      {service.tag}
                    </span>
                    <h3 className="font-display text-2xl font-semibold">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">{service.text}</p>
                    <ArrowRevealButton
                      label="Agendar este serviço"
                      href={whatsappUrl}
                      iconName="arrow"
                      variant="bronze"
                      size="sm"
                      className="mt-6 w-fit"
                      iconSide="right"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-rose-wash" id="unidades">
          <div className="shell">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="Perto de você"
                title={
                  <>
                    Duas unidades em <em className="font-normal text-rose">Camaçari</em>
                  </>
                }
                text="Escolha a unidade mais conveniente e viva uma experiência de beleza pensada em cada detalhe."
              />
              <div className="flex items-center gap-3 text-sm font-semibold text-muted">
                <Icon className="size-5 text-bronze" name="clock" />
                Segunda a sábado, 09h às 18h
              </div>
            </div>
            <div className="mt-12 grid gap-7 lg:grid-cols-2">
              {[
                { name: 'Unidade Centro', image: images.salon, detail: 'Região central de Camaçari — BA' },
                { name: 'Unidade 02', image: images.salonTwo, detail: 'Camaçari — Bahia' },
              ].map((unit, index) => (
                <article className="overflow-hidden rounded-2xl border border-bronze/15 bg-white shadow-soft" key={unit.name}>
                  <div className="aspect-[16/8] overflow-hidden">
                    <img alt={`Ambiente elegante da ${unit.name}`} className="h-full w-full object-cover" src={unit.image} />
                  </div>
                  <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
                    <div>
                      <p className="eyebrow">Unidade 0{index + 1}</p>
                      <h3 className="mt-2 font-display text-3xl font-semibold">{unit.name}</h3>
                      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                        <Icon className="size-4 text-rose" name="location" />
                        {unit.detail}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                        <Icon className="size-4 text-rose" name="clock" />
                        Seg a Sáb | 09h às 18h
                      </p>
                    </div>
                    <ArrowRevealButton
                      label="Ver no mapa"
                      href={`https://www.google.com/maps/search/?api=1&query=salão+de+beleza+Camaçari+Bahia`}
                      iconName="arrow"
                      variant="outline"
                      size="sm"
                      className="w-fit"
                      iconSide="right"
                    />
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-muted">
              O endereço completo da unidade escolhida é confirmado pela equipe no agendamento.
            </p>
          </div>
        </section>

        <section className="section-space bg-charcoal text-white" id="depoimentos">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="eyebrow text-rose-light">Experiências reais</p>
              <h2 className="section-title mt-4 text-white">
                Cuidado que se sente. <em className="font-normal text-rose-light">Resultado que se vê.</em>
              </h2>
              <p className="section-text mt-5 leading-7 text-white/60">
                Mais do que transformar cabelos, cultivamos relações de confiança que atravessam gerações.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 md:p-10">
              <Icon className="size-10 text-rose-light" name="quote" />
              <blockquote className="mt-5 font-display text-2xl leading-relaxed md:text-3xl">
                “Encontrei um salão que realmente escuta o que eu quero e cuida do meu cabelo com carinho. O resultado ficou leve, brilhante e muito natural.”
              </blockquote>
              <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
                <img alt="" className="size-12 rounded-full object-cover object-top" src={images.longHair} />
                <div>
                  <p className="font-semibold">Cliente Estilo & Graça</p>
                  <p className="mt-1 text-xs text-white/50">Camaçari, Bahia</p>
                </div>
                <div className="ml-auto text-sm tracking-wider text-rose-light">★★★★★</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="shell">
            <SectionHeading
              centered
              eyebrow="Transformações"
              title={
                <>
                  Beleza que inspira <em className="font-normal text-rose">todos os dias</em>
                </>
              }
            />
            <div className="mt-12 grid auto-rows-[230px] grid-cols-2 gap-3 md:auto-rows-[300px] md:grid-cols-4 md:gap-5">
              {[
                [images.hero, 'md:row-span-2'],
                [images.blonde, ''],
                [images.brunette, ''],
                [images.gloss, 'md:row-span-2'],
                [images.longHair, 'md:col-span-2'],
              ].map(([image, classes], index) => (
                <a
                  aria-label={`Ver transformação ${index + 1} no Instagram`}
                  className={`group relative overflow-hidden rounded-xl ${classes}`}
                  href="https://www.instagram.com/salaoestiloegraca_/"
                  key={image}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={image} />
                  <span className="absolute inset-0 grid place-items-center bg-charcoal/0 text-white opacity-0 transition group-hover:bg-charcoal/35 group-hover:opacity-100">
                    <Icon className="size-7" name="instagram" />
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl bg-cream px-6 py-6 md:flex-row md:px-9">
              <div className="flex items-center gap-4 text-center md:text-left">
                <span className="hidden size-12 place-items-center rounded-full bg-rose text-white sm:grid">
                  <Icon name="instagram" />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold">Acompanhe nossas transformações</p>
                  <p className="mt-1 text-sm text-muted">@salaoestiloegraca_</p>
                </div>
              </div>
              <ArrowRevealButton
                label="Seguir no Instagram"
                href="https://www.instagram.com/salaoestiloegraca_/"
                iconName="instagram"
                variant="bronze"
                size="md"
                className="w-fit"
                iconSide="right"
              />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-rose py-20 text-white md:py-24">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_35%),radial-gradient(circle_at_80%_80%,white_0,transparent_30%)]" />
          <div className="shell relative text-center">
            <p className="eyebrow text-white/70">Seu momento começa aqui</p>
            <h2 className="section-title mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-tight md:text-6xl">
              Pronta para viver sua próxima transformação?
            </h2>
            <p className="section-text mx-auto mt-5 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              Fale com nossa equipe, escolha sua unidade e reserve um horário pensado especialmente para você.
            </p>
            <ArrowRevealButton
              label="Agendar pelo WhatsApp"
              href={whatsappUrl}
              iconName="whatsapp"
              variant="white"
              size="lg"
              className="mt-8"
              iconSide="left"
            />
          </div>
        </section>
      </main>

      <footer className="bg-charcoal pb-8 pt-16 text-white" id="contato">
        <div className="shell grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-6 text-sm leading-7 text-white/55">
              Beleza com técnica, cuidado e personalidade. Há mais de 20 anos transformando cabelos e elevando autoestima em Camaçari.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                aria-label="Instagram"
                className="social-button"
                href="https://www.instagram.com/salaoestiloegraca_/"
                rel="noreferrer"
                target="_blank"
              >
                <Icon name="instagram" />
              </a>
              <a aria-label="WhatsApp" className="social-button" href={whatsappUrl} rel="noreferrer" target="_blank">
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>
          <div>
            <p className="footer-title">Navegue</p>
            <div className="mt-5 flex flex-col gap-3">
              {navItems.slice(0, 5).map(([label, href]) => (
                <a className="footer-link" href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-title">Visite-nos</p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/55">
              <p className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-rose-light" name="location" />
                2 unidades em Camaçari — Bahia
              </p>
              <p className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-rose-light" name="clock" />
                Segunda a sábado<br />09h às 18h
              </p>
              <p className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-rose-light" name="instagram" />
                @salaoestiloegraca_
              </p>
            </div>
          </div>
        </div>
        <div className="shell flex flex-col gap-3 pt-7 text-center text-[11px] text-white/35 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Salão Estilo & Graça. Todos os direitos reservados.</p>
          <p>Beleza, cuidado & confiança.</p>
        </div>
      </footer>

      <a
        aria-label="Agendar pelo WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl md:bottom-7 md:right-7"
        href={whatsappUrl}
        rel="noreferrer"
        target="_blank"
      >
        <Icon className="size-7" name="whatsapp" />
      </a>
    </div>
      )}
    </>
  )
}

export default App
