"use client"

import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { useReduced } from "@/components/creative/use-reduced"

// The only marquee on the page (Han ribbon). It drifts on its own and speeds up with scroll velocity,
// so it reads as a reaction to the visitor, not decoration. Stands still under reduced motion.
const words = ["Films", "Reels", "Music videos", "Design", "Edits", "Colour"]
const BASE = -4 // percent of one set per second

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export function Marquee() {
  const reduce = useReduced()
  const baseX = useMotionValue(0)
  const dir = useRef(1)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * BASE * (delta / 1000)
    const b = boost.get()
    if (b < 0) dir.current = -1
    else if (b > 0) dir.current = 1
    move += dir.current * move * b
    baseX.set(baseX.get() + move)
  })

  const row = [...words, ...words]

  return (
    <div className="overflow-hidden bg-[var(--c-accent)] py-5 text-white" role="img" aria-label={words.join(", ")}>
      <motion.div
        aria-hidden
        style={{ x }}
        className="flex w-max gap-12 whitespace-nowrap text-3xl font-semibold tracking-tight md:text-5xl"
      >
        {[...row, ...row].map((w, i) => (
          <span key={i} className={i % 2 ? "text-white/75" : ""}>
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
