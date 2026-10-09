"use client"

import { motion } from "framer-motion"
import { YouTubeFacade } from "@/components/creative/youtube-facade"

// Add { id, title } entries here to fill the strip. Empty slots render until then.
const reels: { id: string; title: string }[] = []
const emptySlots = Math.max(0, 3 - reels.length)

const item = (i: number) => ({
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  whileHover: { y: -8 },
  viewport: { once: true, amount: 0.3 },
  transition: { type: "spring" as const, stiffness: 120, damping: 16, delay: i * 0.09 },
})

export function ReelsStrip() {
  return (
    // scrollable region needs a tab stop so keyboard users can reach every reel
    <div
      role="region"
      aria-label="Reels"
      tabIndex={0}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
    >
      {reels.map((r, i) => (
        <motion.div
          key={r.id}
          {...item(i)}
          className={`w-[68vw] max-w-[280px] shrink-0 snap-center md:w-[280px] ${i % 2 ? "md:mt-12" : ""}`}
        >
          <YouTubeFacade id={r.id} title={r.title} vertical />
        </motion.div>
      ))}
      {Array.from({ length: emptySlots }, (_, i) => (
        <motion.div
          key={i}
          {...item(reels.length + i)}
          className={`flex aspect-[9/16] w-[68vw] max-w-[280px] shrink-0 snap-center items-center justify-center rounded-md border border-dashed border-[var(--c-paper)]/40 p-6 text-center text-sm text-[var(--c-paper)]/70 md:w-[280px] ${
            (reels.length + i) % 2 ? "md:mt-12" : ""
          }`}
        >
          Reel goes here
        </motion.div>
      ))}
    </div>
  )
}
