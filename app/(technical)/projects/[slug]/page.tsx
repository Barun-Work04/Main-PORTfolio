import Aurora from "@/components/aurora"
import { notFound } from "next/navigation"

const projects = {
  "facial-emotion-recognition": {
    title: "Facial Emotion Recognition System",
    description:
      "A deep learning-based system that uses Convolutional Neural Networks (CNN) to detect and classify human emotions from facial expressions.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN", "Deep Learning"],
    role: "Developed the complete CNN architecture, trained the model on facial expression datasets, and implemented emotion detection using pictures.",
  },
  "automated-timetable": {
    title: "Automated Timetable Management System",
    description:
      "An intelligent system that automatically generates optimized timetables for educational institutions while considering constraints like teacher availability, room allocation, and student preferences.",
    tech: ["HTML", "CSS", "JavaScript","Algorithm Design", "Constraint Satisfaction", "Database Management", "MongoDB"],
    role: "Designed and implemented the constraint satisfaction algorithm, developed the backend logic for timetable generation and database management, and created a user-friendly interface for administrators.",
  },
}

// Only the slugs in the data above exist; anything else is a real 404 (also blocks keys like "constructor")
export const dynamicParams = false
export const generateStaticParams = () => Object.keys(projects).map((slug) => ({ slug }))

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <div className="relative min-h-screen">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />


      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pb-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {project.title}
          </h1>

          <div className="space-y-8 backdrop-blur-xl bg-card/30 p-12 rounded-3xl border border-primary/20">
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">Description</h2>
              <p className="text-lg leading-relaxed text-foreground/90">{project.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">My Role</h2>
              <p className="text-lg leading-relaxed text-foreground/90">{project.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
