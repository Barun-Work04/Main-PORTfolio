"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"

interface CurvedLoopProps {
  marqueeText: string
  speed?: number
  curveAmount?: number
  direction?: "left" | "right"
  interactive?: boolean
  className?: string
}

export default function CurvedLoop({
  marqueeText,
  speed = 2,
  curveAmount = 400,
  direction = "left",
  interactive = true,
  className = "",
}: CurvedLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (!interactive) return

    let lastScrollY = scrollY.get()
    const unsubscribe = scrollY.on("change", (latest) => {
      const velocity = latest - lastScrollY
      setScrollVelocity(velocity * 0.1)
      lastScrollY = latest
    })

    return () => unsubscribe()
  }, [scrollY, interactive])

  const repeatedText = `${marqueeText} `.repeat(20)

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-8">
      <motion.div
        className={cn("flex whitespace-nowrap", className)}
        animate={{
          x: direction === "left" ? [0, -50 + "%"] : [-50 + "%", 0],
        }}
        transition={{
          duration: 50 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          skewX: interactive ? scrollVelocity : 0,
        }}
      >
        <span
          className="inline-block text-4xl md:text-6xl font-bold tracking-wider"
          style={{
            textShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
          }}
        >
          {repeatedText}
        </span>
      </motion.div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black ${curveAmount / 10}%, black ${100 - curveAmount / 10}%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black ${curveAmount / 10}%, black ${100 - curveAmount / 10}%, transparent)`,
        }}
      />
    </div>
  )
}
