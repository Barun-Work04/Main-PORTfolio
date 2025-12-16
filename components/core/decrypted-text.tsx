"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  className?: string
  parentClassName?: string
  encryptedClassName?: string
  animateOn?: "hover" | "view"
  revealDirection?: "start" | "end" | "center"
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  revealDirection = "start",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isDecrypting, setIsDecrypting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLSpanElement>(null)

  const decrypt = () => {
    if (isDecrypting) return
    setIsDecrypting(true)

    const textArray = text.split("")
    let iterations = 0

    const interval = setInterval(() => {
      setDisplayText(
        textArray
          .map((char, index) => {
            if (revealDirection === "start") {
              if (index < iterations) return char
            } else if (revealDirection === "end") {
              if (index >= textArray.length - iterations) return char
            } else {
              const center = Math.floor(textArray.length / 2)
              const distance = Math.abs(index - center)
              if (distance <= iterations / 2) return char
            }

            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join(""),
      )

      iterations += 1 / (maxIterations / text.length)

      if (iterations >= text.length) {
        clearInterval(interval)
        setDisplayText(text)
        setIsDecrypting(false)
      }
    }, speed)

    intervalRef.current = interval
  }

  useEffect(() => {
    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isDecrypting) {
              decrypt()
            }
          })
        },
        { threshold: 0.1 },
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }
  }, [animateOn])

  return (
    <span
      ref={elementRef}
      onMouseEnter={animateOn === "hover" ? decrypt : undefined}
      className={cn("inline-block cursor-pointer", parentClassName)}
    >
      <span className={cn("font-mono", className, isDecrypting && encryptedClassName)}>{displayText}</span>
    </span>
  )
}
