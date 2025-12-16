"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

interface HeroParallaxProps {
  imageUrl: string
  title?: string
  description?: string[]
}

export function HeroParallax({ imageUrl, title, description = [] }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2.5, 2.5])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.5, 0])

  return (
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image src={imageUrl || "/placeholder.svg"} alt={title || "Hero"} fill className="object-cover" priority />
            {/* Radial vignette overlay for feathered edges */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 85%, rgb(0,0,0) 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
