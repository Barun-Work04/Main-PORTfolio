"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useReduced } from "@/components/creative/use-reduced"

// Paper notes pinned loosely (Fragments pink excerpt and yellow sticky, Jackie handwriting).
// Each note drops in once, then drifts at its own speed as you scroll, which gives the stack depth.
const notes = [
  { title: "Reels and short-form", body: "Vertical edits built around the first three seconds.", span: "md:col-span-4", tilt: -1, drift: 18, bg: "var(--c-paper)", fg: "var(--c-ink)" },
  { title: "Music videos", body: "Shoot, edit and grade.", span: "md:col-span-2", tilt: 2, drift: -22, bg: "var(--c-accent)", fg: "#fff" },
  { title: "Event and brand films", body: "Recaps, promos and short documentaries.", span: "md:col-span-2", tilt: 1, drift: 14, bg: "var(--c-mustard)", fg: "var(--c-ink)" },
  { title: "Posters and design", body: "Posters, covers and graphics that sit next to the film.", span: "md:col-span-4", tilt: -2, drift: -16, bg: "var(--c-pink)", fg: "var(--c-ink)" },
]

function Note({ n, i }: { n: (typeof notes)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReduced()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const drift = useTransform(scrollYProgress, [0, 1], [n.drift, -n.drift])

  return (
    <motion.article
      ref={ref}
      className={`${n.span} rounded-md p-6 shadow-[0_14px_30px_rgba(0,0,0,0.35)]`}
      style={{ backgroundColor: n.bg, color: n.fg, y: reduce ? 0 : drift, rotate: reduce ? 0 : n.tilt }}
      initial={{ opacity: 0, scale: 0.92, rotate: n.tilt * 4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: reduce ? 0 : n.tilt }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.1 }}
    >
      <h3 className="font-[family-name:var(--font-hand)] text-4xl leading-none">{n.title}</h3>
      <p className="mt-4 max-w-[38ch] text-base">{n.body}</p>
    </motion.article>
  )
}

export function ServiceNotes() {
  return (
    <div className="grid gap-6 md:grid-cols-6">
      {notes.map((n, i) => (
        <Note key={n.title} n={n} i={i} />
      ))}
    </div>
  )
}
