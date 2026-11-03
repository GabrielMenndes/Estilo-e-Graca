import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface VideoIntroProps {
  onComplete: () => void
  videoSrc?: string
  transitionTimestamp?: number // timestamp in seconds when doors open
}

export function VideoIntro({
  onComplete,
  videoSrc = '/videodaentrada.mp4',
  transitionTimestamp = 3.5, // default: 3.5 seconds (adjust based on your video)
}: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showSite, setShowSite] = useState(false)
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

    const triggerTransition = () => {
      setIsPlaying(false)
      // Fade out overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setShowSite(false)
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
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
        }}
      />
      {/* Optional: loading indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        Carregando...
      </div>
    </div>
  )
}

export default VideoIntro