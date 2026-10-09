import Aurora from "@/components/aurora"
import { notFound } from "next/navigation"

const experiences = {
  "shiksak-intern": {
    title: "Full Stack Development & AI Intern",
    company: "Shiksak",
    duration: "Sep 2025 – Dec 2025",
    responsibilities: [
      "Contributed to full-stack web development projects using frontend and backend technologies[Education Platform-LMS and CRM]",
      "Developed AI-assisted workflows to improve automation processes",
      "Implemented AI-powered features for content and video generation",
      "Collaborated with cross-functional teams to integrate AI solutions into existing platforms",
      "Participated in code reviews and maintained high code quality standards",
    ],
  },
  "cpl-intern": {
    title: "Social Media Intern",
    company: "Citizen for Public Leadership (CPL)",
    duration: "Oct 2024 – August 2025",
    responsibilities: [
      "Managed digital presence and social media strategy for the organization",
      "Coordinated campaigns and communication initiatives",
      "Worked as core member of CPL Policy Conclave 2025 in Delhi",
      "Created engaging content to increase audience engagement and reach",
      "Analyzed social media metrics to optimize content strategy",
    ],
  },
  "nielit-intern": {
    title: "AI/ML Intern",
    company: "NIELIT",
    duration: "3 June – 2 July 2025",
    responsibilities: [
      "Gained hands-on experience with machine learning algorithms and frameworks",
      "Worked on deep learning projects using TensorFlow and Keras",
      "Developed understanding of neural network architectures and training processes",
      "Implemented computer vision applications using OpenCV",
      "Participated in workshops and training sessions on advanced AI topics",
    ],
  },
}

// Only the slugs in the data above exist; anything else is a real 404 (also blocks keys like "constructor")
export const dynamicParams = false
export const generateStaticParams = () => Object.keys(experiences).map((slug) => ({ slug }))

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const experience = experiences[slug as keyof typeof experiences]

  if (!experience) {
    notFound()
  }

  return (
    <div className="relative min-h-screen">


      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pb-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {experience.title}
          </h1>
          <p className="text-2xl font-heading mb-2 text-accent">{experience.company}</p>
          <p className="text-lg text-muted-foreground mb-12">{experience.duration}</p>

          <div className="backdrop-blur-xl bg-card/30 p-12 rounded-3xl border border-primary/20">
            <h2 className="text-2xl font-heading font-semibold mb-6 text-primary">Key Responsibilities</h2>
            <ul className="space-y-4">
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex gap-3 text-lg leading-relaxed">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-foreground/90">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
