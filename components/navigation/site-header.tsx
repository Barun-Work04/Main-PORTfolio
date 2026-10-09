import { BubbleMenu } from "@/components/navigation/bubble-menu"
import { ModeToggle } from "@/components/navigation/mode-toggle"

// z-50 is the only layer above page content; pages reserve pt-24 for it
export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex items-center justify-center px-4 md:px-8">
      <div className="pointer-events-auto">
        <ModeToggle />
      </div>
      <div className="pointer-events-auto absolute right-4 md:right-8">
        <BubbleMenu />
      </div>
    </header>
  )
}
