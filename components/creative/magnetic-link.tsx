"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Pill that leans toward the cursor and presses in on click. Springs live outside React state.
export function MagneticLink({
  href,
  children,
  className = "",
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18 })
  const y = useSpring(my, { stiffness: 220, damping: 18 })

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      className={`inline-block whitespace-nowrap rounded-full font-semibold ${className}`}
    >
      {children}
    </motion.a>
  )
}
