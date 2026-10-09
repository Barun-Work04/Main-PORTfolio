"use client"

import { useRef } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import DecryptedText from "@/components/core/decrypted-text"
import { MagneticLink } from "@/components/creative/magnetic-link"
import { useReduced } from "@/components/creative/use-reduced"

const ease = [0.16, 1, 0.3, 1] as const
const FPS = 24

// Scroll position read as film timecode: 1 screen of scroll = 10 seconds of footage.
function toTimecode(scrollY: number, screen: number) {
  const frames = Math.floor((scrollY / screen) * 10 * FPS)
  const f = frames % FPS
  const s = Math.floor(frames / FPS) % 60
  const m = Math.floor(frames / FPS / 60)
  const p = (n: number) => String(n).padStart(2, "0")
  return `${p(m)}:${p(s)}:${p(f)}`
}

export function CreativeHero() {
  const ref = useRef<HTMLElement>(null)
  const tcRef = useRef<HTMLSpanElement>(null)
  const reduce = useReduced()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const { scrollY } = useScroll()

  // Kamui: the hero recedes as the next scene arrives
  const y = useTransform(scrollYProgress, [0, 1], [0, -140])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120])

  // Written straight to the DOM: no React re-render per scroll frame
  useMotionValueEvent(scrollY, "change", (v) => {
    if (tcRef.current) tcRef.current.textContent = toTimecode(v, window.innerHeight)
  })

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  })

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pt-24 pb-12">
      {/* Soft cobalt atmosphere (ref 9): two blurred shapes drifting slowly, then a vignette over them */}
      <motion.div aria-hidden style={reduce ? undefined : { y: glowY }} className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[18%] top-[22%] h-[28rem] w-[28rem] rounded-full bg-[var(--c-accent)] opacity-25 blur-[120px]"
          animate={reduce ? undefined : { x: [0, 60, -20, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-[10%] -top-[18%] h-[34rem] w-[60rem] -rotate-12 rounded-full bg-[var(--c-paper)] opacity-[0.16] blur-[140px]"
          animate={reduce ? undefined : { x: [0, -50, 30, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgb(0 0 0 / 0.75) 100%)" }}
      />

      {/* Sutera: small mono labels in the corners, timecode follows the scroll */}
      <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-8 top-24 hidden font-[family-name:var(--font-mono)] text-xs tracking-wider text-[var(--c-paper)]/70 md:block">
        <span className="absolute left-0 top-0 border-l border-t border-[var(--c-paper)]/40 pl-3 pt-2">EDIT / COLOUR / SOUND</span>
        <span className="absolute right-0 top-0 border-r border-t border-[var(--c-paper)]/40 pr-3 pt-2">24 FPS</span>
        <span className="absolute bottom-0 left-0 border-b border-l border-[var(--c-paper)]/40 pb-2 pl-3">REC</span>
        <span ref={tcRef} className="absolute bottom-0 right-0 border-b border-r border-[var(--c-paper)]/40 pb-2 pr-3">
          00:00:00
        </span>
      </div>

      <motion.div style={reduce ? undefined : { y, scale, opacity }} className="relative flex flex-col items-center text-center">
        <h1 aria-label="Barun Sahoo" className="font-light leading-[0.95] tracking-tighter text-white">
          {reduce ? (
            <span className="font-mono text-6xl md:text-[9rem]">BARUN SAHOO</span>
          ) : (
            <span aria-hidden>
              <DecryptedText
                text="BARUN SAHOO"
                animateOn="view"
                speed={30}
                maxIterations={15}
                revealDirection="center"
                className="text-6xl font-light md:text-[9rem]"
              />
            </span>
          )}
        </h1>
        <motion.p {...rise(0.9)} className="mt-8 max-w-[34ch] text-lg text-[var(--c-paper)]/80">
          I shoot, edit and design films, reels and music videos for people with something to say.
        </motion.p>
        <motion.div {...rise(1.1)}>
          <MagneticLink href="#work" className="mt-8 bg-[var(--c-paper)] px-7 py-3 text-sm text-[var(--c-ink)]">
            See work
          </MagneticLink>
        </motion.div>
      </motion.div>
    </section>
  )
}
