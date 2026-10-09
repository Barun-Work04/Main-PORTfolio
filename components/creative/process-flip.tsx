"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Kamui card carousel. Neighbours sit angled and dimmed, the centre card turns to face you.
// Change step with the buttons, arrow keys or a swipe on the centre card.
const steps = [
  { title: "Shoot", body: "Planning, framing and capturing footage that already has a point of view." },
  { title: "Cut", body: "Rhythm, pacing and structure. The story is found in the edit." },
  { title: "Grade", body: "Colour that sets the mood and keeps every shot in the same world." },
  { title: "Sound", body: "Music, mix and sound design that carry the cut." },
]

export function ProcessFlip() {
  const [active, setActive] = useState(0)
  const n = steps.length
  const go = (d: number) => setActive((a) => (a + d + n) % n)

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="How a film gets made"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1)
        if (e.key === "ArrowRight") go(1)
      }}
      className="rounded-md outline-offset-8"
    >
      <p className="sr-only" aria-live="polite">
        {`Step ${active + 1} of ${n}: ${steps[active].title}. ${steps[active].body}`}
      </p>
      <div className="relative mx-auto flex h-[22rem] max-w-4xl items-center justify-center [perspective:1200px]">
        {[-1, 0, 1].map((offset) => {
          const idx = (active + offset + n) % n
          const center = offset === 0
          return (
            <motion.article
              key={idx}
              initial={{ opacity: 0, rotateY: 80 }}
              animate={{
                opacity: center ? 1 : 0.6,
                rotateY: center ? 0 : offset * -28,
                x: `${offset * 105}%`,
                scale: center ? 1 : 0.82,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              aria-hidden={!center}
              drag={center ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(1)
                else if (info.offset.x > 70) go(-1)
              }}
              className={`absolute flex h-full w-[min(18rem,72vw)] touch-pan-y flex-col justify-between rounded-md p-6 ${
                center
                  ? "z-10 cursor-grab bg-[var(--c-accent)] text-white active:cursor-grabbing"
                  : "hidden bg-[#26262d] text-[var(--c-paper)] md:flex"
              }`}
            >
              <h3 className="text-4xl font-semibold tracking-tight">{steps[idx].title}</h3>
              <p className="text-base">{steps[idx].body}</p>
            </motion.article>
          )
        })}
      </div>
      <div className="mt-8 flex justify-center gap-3">
        {[
          { d: -1, Icon: ArrowLeft, label: "Previous step" },
          { d: 1, Icon: ArrowRight, label: "Next step" },
        ].map(({ d, Icon, label }) => (
          <motion.button
            key={label}
            type="button"
            onClick={() => go(d)}
            aria-label={label}
            whileTap={{ scale: 0.9 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--c-paper)]/40 transition-colors hover:bg-[var(--c-paper)] hover:text-[var(--c-ink)]"
          >
            <Icon className="h-5 w-5" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
