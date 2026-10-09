"use client"

import { useEffect } from "react"
import { MotionConfig, motion, useScroll } from "framer-motion"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

// Film grain (paper and light-leak references): one fixed, click-through layer, so scrolling content never repaints it.
const GRAIN = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)

// One place for page-wide motion: reduced-motion handling, smooth scroll, scroll progress.
export function CreativeShell({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // anchors: in-page links (#work) glide, offset for the fixed header
    const lenis = new Lenis({ anchors: { offset: -96 } })
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return (
    // reducedMotion="user" turns off transform animation for visitors who ask for less motion
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[var(--c-accent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.13] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,${GRAIN}")` }}
      />
      {children}
    </MotionConfig>
  )
}
