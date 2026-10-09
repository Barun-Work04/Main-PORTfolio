"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { YouTubeFacade } from "@/components/creative/youtube-facade"

// Folder-tab index (Fragments reference): stacked tabs, each its own colour, staggered sideways on desktop.
// Add `video` (a YouTube id) to a tab to fill it. Text colours are chosen per tab for AA contrast.
const tabs: { label: string; bg: string; fg: string; note: string; video?: string }[] = [
  { label: "Films", bg: "var(--c-accent)", fg: "#fff", note: "Competition entries and short films." },
  { label: "Reels", bg: "var(--c-coral)", fg: "var(--c-ink)", note: "Short-form edits for people and brands." },
  { label: "Music videos", bg: "var(--c-green)", fg: "#fff", note: "Shoots and edits made with other artists." },
  { label: "Design", bg: "var(--c-mustard)", fg: "var(--c-ink)", note: "Posters, graphics and promos." },
]

export function WorkTabs() {
  const [open, setOpen] = useState(0)

  return (
    <div className="flex flex-col">
      {tabs.map((tab, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={tab.label}
            className="-mt-px first:mt-0"
            style={{ color: tab.fg }}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 110, damping: 18, delay: i * 0.08 }}
          >
            <motion.button
              id={`work-tab-${i}`}
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`work-panel-${i}`}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{ backgroundColor: tab.bg, ["--off" as string]: `${i * 9}%` }}
              className="flex w-full items-center justify-between rounded-t-md border-t border-black/15 px-5 py-4 text-left text-lg font-semibold md:pl-[calc(1.25rem+var(--off))]"
            >
              <span>{tab.label}</span>
              <span className="text-sm font-normal">{isOpen ? "Close" : "Open"}</span>
            </motion.button>
            <div
              id={`work-panel-${i}`}
              role="region"
              aria-labelledby={`work-tab-${i}`}
              inert={!isOpen}
              style={{ backgroundColor: tab.bg }}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                {/* content arrives a beat after the panel opens */}
                <div
                  className={`grid gap-6 p-5 transition-[opacity,transform] duration-500 motion-reduce:transition-none md:grid-cols-[1.4fr_1fr] md:p-8 ${
                    isOpen ? "translate-y-0 opacity-100 delay-150" : "translate-y-3 opacity-0"
                  }`}
                >
                  {tab.video ? (
                    <YouTubeFacade id={tab.video} title={`${tab.label} showcase`} />
                  ) : (
                    <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-current text-sm">
                      Footage goes here
                    </div>
                  )}
                  <p className="self-end text-lg">{tab.note}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
