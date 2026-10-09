import Aurora from "@/components/aurora"
import { FlowingMenu } from "@/components/sections/flowing-menu"
const projects = [
  {
    title: "Facial Emotion Recognition System",
    slug: "facial-emotion-recognition",
  },
  {
    title: "Automated Timetable Management System",
    slug: "automated-timetable",
  },
]



export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />


      <div className="relative z-10">
        <div className="text-center pt-32 pb-16">
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-white">Projects</h1>
        </div>

        <FlowingMenu items={projects} basePath="/projects" />
      </div>
    </div>
  )
}