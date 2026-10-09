"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

// useReducedMotion is false on the server and true in the browser for some visitors, which breaks hydration
// when it picks different markup. This reports true only after mount, so server and first client render match.
export function useReduced() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !!reduce
}
