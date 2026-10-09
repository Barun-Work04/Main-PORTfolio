"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const modes = [
  { label: "Tech", href: "/" },
  { label: "Creative", href: "/creative" },
]

export function ModeToggle() {
  const isCreative = usePathname().startsWith("/creative")
  // The page theme decides the palette: emerald on tech, ink and paper on creative
  const shell = isCreative ? "bg-black/50 border-white/20" : "bg-emerald-900/60 border-emerald-800/60"
  const pill = isCreative ? "bg-[#E8E5DE]" : "bg-emerald-700/80"
  const on = isCreative ? "text-[#141416]" : "text-white"
  const off = isCreative ? "text-[#E8E5DE]/80 hover:text-white" : "text-emerald-200/70 hover:text-white"

  return (
    <div role="tablist" aria-label="Portfolio mode" className={`flex rounded-full border p-1 backdrop-blur-xl ${shell}`}>
      {modes.map((mode) => {
        const active = (mode.label === "Creative") === isCreative
        return (
          <Link
            key={mode.label}
            href={mode.href}
            role="tab"
            aria-selected={active}
            className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${active ? on : off}`}
          >
            {active && (
              <motion.span
                layoutId="mode-pill"
                className={`absolute inset-0 rounded-full ${pill}`}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{mode.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
