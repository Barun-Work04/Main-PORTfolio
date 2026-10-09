"use client"

import { motion } from "framer-motion"

const ease = [0.16, 1, 0.3, 1] as const

// Sliding text reveal: each word rises out of its own mask. Plays once when the heading enters the viewport.
export function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.h2
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.06 }}
    >
      {text.split(" ").map((word, i) => (
        // pb/-mb reserve room for descenders so the mask does not clip them
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, shown: { y: 0 } }}
            transition={{ duration: 0.8, ease }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

// Fade-and-rise for any block, once.
export function Rise({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  )
}
