"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TextShimmerProps {
  children: string
  className?: string
  duration?: number
}

export function TextShimmer({ children, className, duration = 2 }: TextShimmerProps) {
  return (
    <motion.div
      className={cn("inline-block", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
        {children}
      </span>
    </motion.div>
  )
}
