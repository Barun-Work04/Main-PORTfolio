import Aurora from "@/components/aurora"
import { BubbleMenu } from "@/components/navigation/bubble-menu"
import { notFound } from "next/navigation"

const certifications = {
  "google-cloud": {
    title: "Google Cloud Foundations",
    issuer: "Google Cloud",
    topics: [
      "Infrastructure in Google Cloud",
      "Artificial Intelligence",
      "Machine Learning",
      "Networking in Google Cloud",
      "Basic Cloud Architecture",
    ],
    description:
      "Comprehensive certification covering fundamental concepts of Google Cloud Platform, including infrastructure management, AI/ML services, and networking best practices.",
    links: [
      { label: 'Certificate (Drive)', url: 'https://www.skills.google/public_profiles/d30fda34-8036-48f5-b833-7af544a3f61e/badges/5580131?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share' }
    ],
  },
  "shikshak-completion": {
    title: "Full Stack Development & AI",
    issuer: "Shikshak",
    duration: "Sep 2025 – Dec 2025(Remote)",
    topics: [
      "Full Stack Web Development",
      "AI Integration",
      "Modern Web Technologies",
      "Backend Development",
      "AI Automation",
      "Video & Content Generation",
    ],
    description:
      "Internship completion certificate recognizing contributions to full-stack development projects and AI-powered solutions.",
    links: [
      { label: 'Certificate (Drive)', url: 'https://drive.google.com/file/d/18Qs8yVYH29wL-U23cqDkNDWihVD25VIn/view' }
    ],
  },
  "nielit-ai-ml": {
    title: "Artificial Intelligence & Machine Learning",
    issuer: "NIELIT (National Institute of Electronics & Information Technology)",
    duration: "3 June – 2 July 2025(ON-SITE)",
    topics: ["Machine Learning Algorithms", "Deep Learning", "Neural Networks", "Computer Vision", "AI Applications"],
    description:
      "Professional certification in AI and ML covering theoretical foundations and practical implementations of machine learning systems.",
    links: [
      { label: 'Certificate (Drive)', url: 'https://drive.google.com/file/d/1lxZj6FjUTmv6L8hF6wzZtWo3eoFoVl4M/view' }
    ],
  },
  "ibm-ai-ml": {
    title: "AI & Machine Learning",
    issuer: "IBM (in collaboration with AICTE)",
    duration: "6 Weeks",
    topics: ["IBM Watson", "Machine Learning Models", "Data Science", "AI Ethics", "Enterprise AI Solutions"],
    description:
      "Industry-recognized certification from IBM covering enterprise-level AI and machine learning technologies and best practices.",
    links: [
      { label: 'Certificate (Drive)', url: 'https://drive.google.com/file/d/1Ws77oTil_tuw0N5vMio02khMPMebb4cJ/view' }
    ],
  },
}

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const certification = certifications[slug as keyof typeof certifications]

  if (!certification) {
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

      <BubbleMenu />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {certification.title}
          </h1>
          <p className="text-2xl font-heading mb-12 text-accent">{certification.issuer}</p>
          {certification.duration ? (
            <p className="text-sm text-foreground/70 mb-6">Duration: {certification.duration}</p>
          ) : null}

          <div className="space-y-8 backdrop-blur-xl bg-card/30 p-12 rounded-3xl border border-primary/20">
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">Description</h2>
              <p className="text-lg leading-relaxed text-foreground/90">{certification.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">Topics Covered</h2>
              <ul className="space-y-3">
                {certification.topics.map((topic, index) => (
                  <li key={index} className="flex gap-3 text-lg">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-foreground/90">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {certification.links && certification.links.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-4">
                {certification.links.map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-3 rounded-xl bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
