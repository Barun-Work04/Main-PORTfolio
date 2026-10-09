import type React from "react"
import { Bricolage_Grotesque, Caveat, Cormorant_Garamond } from "next/font/google"
import { CreativeShell } from "@/components/creative/creative-shell"

// Creative side has its own type and palette.
// Tokens: ink (page), paper (objects), accent (cobalt). Paper-note colours (coral, mustard, pink, green) live on objects only.
// Shape rule: paper objects 6px radius, interactive pills fully round.
// Serif is reserved for one editorial emphasis (closing line), matching the Lowe and Fragments references.
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-creative" })
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" })
const serif = Cormorant_Garamond({ subsets: ["latin"], style: ["italic"], weight: ["500", "600"], variable: "--font-serif" })

export default function CreativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${display.variable} ${hand.variable} ${serif.variable} min-h-[100dvh] bg-[var(--c-ink)] text-[var(--c-paper)] font-[family-name:var(--font-creative)] [&_*:focus-visible]:outline-2 [&_*:focus-visible]:outline-offset-2 [&_*:focus-visible]:outline-[var(--c-paper)]`}
      style={
        {
          "--c-ink": "#141416",
          "--c-paper": "#E8E5DE",
          "--c-accent": "#2B3FE0",
          "--c-coral": "#E4572E",
          "--c-mustard": "#E8B931",
          "--c-green": "#14795A",
          "--c-pink": "#E59AA6",
        } as React.CSSProperties
      }
    >
      <CreativeShell>{children}</CreativeShell>
    </div>
  )
}
