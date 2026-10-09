"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play } from "lucide-react"

// Thumbnail first, iframe only on click: keeps LCP and INP clean. The thumbnail crossfades into the player.
export function YouTubeFacade({ id, title, vertical = false }: { id: string; title: string; vertical?: boolean }) {
  const [playing, setPlaying] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const ratio = vertical ? "aspect-[9/16]" : "aspect-video"

  // hand keyboard focus to the player once it exists
  useEffect(() => {
    if (playing) frame.current?.focus()
  }, [playing])

  return (
    <div className={`relative ${ratio} w-full overflow-hidden rounded-md bg-black`}>
      {playing && (
        <iframe
          ref={frame}
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
      <AnimatePresence>
        {!playing && (
          <motion.button
            key="poster"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
            <motion.span
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--c-paper)] text-[var(--c-ink)]"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
