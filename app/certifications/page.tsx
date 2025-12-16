import Aurora from "@/components/aurora"
import { BubbleMenu } from "@/components/navigation/bubble-menu"
import { FlowingMenu } from "@/components/sections/flowing-menu"

const certifications = [
  {
    title: "Google Cloud Foundations",
    slug: "google-cloud",
  },
  {
    title: "Shikshak Internship Completion",
    slug: "shikshak-completion",
  },
  {
    title: "NIELIT – AI & Machine Learning",
    slug: "nielit-ai-ml",
  },
  {
    title: "IBM – AI & Machine Learning",
    slug: "ibm-ai-ml",
  },
]

export default function CertificationsPage() {
  return (
    <div className="relative min-h-screen">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      <BubbleMenu />

      <div className="relative z-10">
        <div className="text-center pt-32 pb-16">
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-white">Certifications</h1>
        </div>

        <FlowingMenu items={certifications} basePath="/certifications" />
      </div>
    </div>
  )
}
