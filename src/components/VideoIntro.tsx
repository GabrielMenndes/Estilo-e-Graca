import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface VideoIntroProps {
  onComplete: () => void
  videoSrc?: string
  transitionTimestamp?: number // timestamp in seconds when doors open
}

export function VideoIntro({
  onComplete,
  videoSrc = `${import.meta.env.BASE_URL}videodaentrada.mp4`,
  transitionTimestamp = 3.5, // default: 3.5 seconds (adjust based on your video)
}: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const transitionTriggered = useRef(false)

  useGSAP(() => {
    const video = videoRef.current
    const overlay = overlayRef.current
    if (!video || !overlay) return

    // Ensure video is ready
    const handleCanPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked, show site directly
        setIsPlaying(false)
        onComplete()
      })
    }

    const handleTimeUpdate = () => {
      // Trigger transition at the specified timestamp (when doors open)
      if (!transitionTriggered.current && video.currentTime >= transitionTimestamp) {
        transitionTriggered.current = true
        triggerTransition()
      }
    }

    const handleEnded = () => {
      if (!transitionTriggered.current) {
        triggerTransition()
      }
    }

    const handleError = () => {
      transitionTriggered.current = true
      setIsPlaying(false)
      onComplete()
    }

    const triggerTransition = () => {
      // Fade out overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsPlaying(false)
          onComplete()
        },
      })
      // Fade out video slightly before overlay for smooth transition
      gsap.to(video, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        delay: 0.2,
      })
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    // Attempt to play
    video.muted = true // required for autoplay
    video.play().catch(() => {
      // If autoplay fails, show site directly
      setIsPlaying(false)
      onComplete()
    })

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      gsap.killTweensOf(overlay)
      gsap.killTweensOf(video)
    }
  }, [onComplete, transitionTimestamp])

  if (!isPlaying) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={`${import.meta.env.BASE_URL}assets/logo-do-live-con.jpg?v=4`}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
        }}
      />
      <div
        aria-label="Carregando"
        role="status"
        style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1.75rem',
          height: '1.75rem',
          border: '2px solid rgba(255,255,255,0.35)',
          borderTopColor: '#ffffff',
          borderRadius: '50%',
          animation: 'video-intro-spin 0.8s linear infinite',
          zIndex: 1,
        }}
      />
      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          margin: 0,
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        Seja bem-vindo ao Salão Estilo &amp; Graça
      </p>
    </div>
  )
}

export default VideoIntro