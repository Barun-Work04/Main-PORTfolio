"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

interface FlowingMenuItem {
  title: string
  slug: string
}

interface FlowingMenuProps {
  items: FlowingMenuItem[]
  basePath: string
}

export function FlowingMenu({ items, basePath }: FlowingMenuProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="flex flex-wrap gap-6 justify-center items-center">
          {items.map((item, index) => (
            <FlowingMenuItemComponent key={item.slug} item={item} index={index} basePath={basePath} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FlowingMenuItemComponent({ item, index, basePath }: { item: FlowingMenuItem, index: number, basePath: string }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setRotation(Math.random() * 4 - 2)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`${basePath}/${item.slug}`}>
        <motion.div
          className="px-8 py-4 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer"
          whileHover={{ scale: 1.05, rotate: rotation }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl font-heading font-semibold">{item.title}</span>
        </motion.div>
      </Link>
    </motion.div>
  )
}
