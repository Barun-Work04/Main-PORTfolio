"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/contact" },
]

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

export function BubbleMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // palette follows the page: emerald on tech, ink and paper on creative
  const creative = pathname.startsWith("/creative")

  // close on route change, outside click, Escape
  useEffect(() => setIsOpen(false), [pathname])
  useEffect(() => {
    if (!isOpen) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [isOpen])

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className={`w-11 h-11 rounded-full backdrop-blur-xl border flex items-center justify-center transition-colors ${creative ? "bg-black/50 border-white/20 hover:bg-black/70" : "bg-emerald-900/60 border-emerald-800/60 hover:bg-emerald-900/70"}`}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className={`w-5 h-5 ${creative ? "text-[#E8E5DE]" : "text-emerald-200"}`} /> : <Menu className={`w-5 h-5 ${creative ? "text-[#E8E5DE]" : "text-emerald-200"}`} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label="Main"
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={`absolute right-0 top-14 w-56 origin-top-right rounded-2xl backdrop-blur-xl border p-2 ${creative ? "bg-[#141416]/90 border-white/20 shadow-[0_18px_50px_rgba(0,0,0,0.6)]" : "bg-emerald-950/80 border-emerald-800/60 shadow-[0_18px_50px_rgba(2,44,34,0.5)]"}`}
          >
            {menuItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? creative ? "bg-[#E8E5DE] text-[#141416]" : "bg-emerald-800/70 text-white"
                      : creative ? "text-[#E8E5DE]/85 hover:bg-white/10 hover:text-white" : "text-emerald-100/80 hover:bg-emerald-900/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
