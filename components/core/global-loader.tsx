import { TextShimmer } from "@/components/core/text-shimmer"

export function GlobalLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <TextShimmer className="font-mono text-sm" duration={1}>
        Loading...
      </TextShimmer>
    </div>
  )
}
