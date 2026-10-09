"use client"

import { motion } from "framer-motion"
import { YouTubeFacade } from "@/components/creative/youtube-facade"

// Deterministic torn top edge (no Math.random, so server and client render the same shape).
const TORN = (() => {
  const pts = ["0% 10px"]
  const n = 56
  for (let i = 1; i < n; i++) {
    const jag = ((i * 37) % 11) + (i % 2 ? 0 : 9)
    pts.push(`${((i / n) * 100).toFixed(2)}% ${jag}px`)
  }
  pts.push("100% 10px", "100% 100%", "0% 100%")
  return `polygon(${pts.join(",")})`
})()

// Paper mat drops in tilted, settles, straightens on hover (Portfolio 2024 + Jackie references).
export function FeaturedFilm({ id, title }: { id: string; title: string }) {
  return (
    <motion.figure
      className="relative w-full max-w-3xl"
      initial={{ opacity: 0, y: 90, rotate: 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      whileHover={{ rotate: 0, scale: 1.015 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
    >
      <div className="relative bg-[var(--c-paper)] px-5 pb-20 pt-9 shadow-[0_24px_40px_rgba(0,0,0,0.5)]" style={{ clipPath: TORN }}>
        <YouTubeFacade id={id} title={title} />
      </div>
      <span aria-hidden className="absolute -top-3 left-1/2 h-8 w-32 -translate-x-1/2 rotate-2 bg-[var(--c-accent)]/80" />
      <figcaption className="absolute bottom-5 left-7 font-[family-name:var(--font-hand)] text-4xl leading-none text-[var(--c-ink)]">
        {title}
      </figcaption>
      <span className="absolute -right-2 -top-4 md:-right-3 md:bottom-8 md:top-auto rotate-6 rounded-full bg-[var(--c-mustard)] px-5 py-2 text-sm font-bold text-[var(--c-ink)] shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
        Competition entry
      </span>
    </motion.figure>
  )
}
