"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Certifications", href: "/certifications" },
]

export function BubbleMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-emerald-900/60 backdrop-blur-xl border border-emerald-800/60 flex items-center justify-center hover:bg-emerald-900/70 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-5 h-5 text-emerald-200" /> : <Menu className="w-5 h-5 text-emerald-200" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-1/2 right-20 -translate-y-1/2 flex flex-row gap-4 items-center"
          >
              {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={item.href}
                    className="px-6 py-3 rounded-full bg-emerald-900/60 backdrop-blur-xl border border-emerald-800/60 hover:bg-emerald-900/70 transition-colors text-base font-medium whitespace-nowrap"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
