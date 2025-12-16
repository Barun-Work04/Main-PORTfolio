"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import DecryptedText from "@/components/core/decrypted-text"
import LetterGlitch from "@/components/LetterGlitch"
// import ColorBends from "@/components/backgrounds/color-bends"
import { BubbleMenu } from "@/components/navigation/bubble-menu"
import { HeroParallax } from "@/components/sections/hero-parallax"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import CurvedLoop from "@/components/core/curved-loop"
import { Mail, Linkedin, FileText, Briefcase, GraduationCap, Users } from "lucide-react"

const aboutContent = [
 [
  "My name is Barun Sahoo, and my work is rooted in full-stack web development with a growing focus on AI and machine learning. What began as curiosity about how websites function evolved into building scalable applications using modern frontend frameworks, backend architectures, and intelligent systems that enhance real-world usability.",
  "Alongside development, I have worked on real-world projects involving backend logic, database-driven systems, and applied AI models, including CNN-based solutions. My professional experience includes contributing to full-stack development, AI-assisted workflows, and AI-powered content and video creation, bridging technical implementation with practical, user-facing outcomes.",
  "Beyond engineering, I have taken on leadership and coordination roles where I managed digital platforms, collaborated on large-scale initiatives, and worked closely with diverse teams. I am currently pursuing my engineering degree at Sikkim Manipal Institute of Technology (2023–2027), and this blend of technical depth, creativity, and leadership continues to shape how I build, think, and grow."
]

]

const experienceHighlights = [
  {
    id: "sikshak-smit",
    title: "Sikshak",
    role: "Full Stack & AI Intern",
    description: "Worked on front-end and back-end development tasks across web-based systems and Contributed to AI-related development and AI-driven video and content creation workflows.",
    icon: GraduationCap,
    slug: "sikshak-smit",
  },
  {
    id: "nielit",
    title: "NIELIT",
    role: "AI/ML Research Intern",
    description: "Developed CNN models in Python (TensorFlow/Keras) for facial emotion recognition & Implemented preprocessing, augmentation, training, and evaluation pipelines.",
    icon: Briefcase,
    slug: "nielit-intern",
  },
  {
    id: "cpl",
    title: "CPL",
    role: "Core Member & Digital Lead",
    description: "Managed CPL’s digital presence; coordinated campaigns and event PR & CPL Policy Conclave (Delhi) 2025 member; supported organizing teams and handled social media management campaigns.",
    icon: Users,
    slug: "cpl-core-member",
  },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const nameOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const nameScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85])
  const nameY = useTransform(scrollYProgress, [0, 0.2], [0, -200])
  const glitchOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.3, 0])

  return (
    <div ref={containerRef} className="relative">
      <BubbleMenu />

      <motion.div style={{ opacity: glitchOpacity }} className="fixed inset-0 z-0 pointer-events-none">
        <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
      </motion.div>

      <div className="relative h-[150vh] flex items-center justify-center">
        <motion.div
          style={{ opacity: nameOpacity, y: nameY, scale: nameScale }}
          className="text-center z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h1 className="font-heading text-7xl md:text-9xl font-bold text-white">
            <DecryptedText
              text="BARUN SAHOO"
              animateOn="view"
              speed={30}
              maxIterations={15}
              revealDirection="center"
              className="text-7xl md:text-9xl"
            />
          </h1>
        </motion.div>
      </div>

      <div className="relative z-10">
        <HeroParallax imageUrl="/cover.png" title="" description={[]} />
      </div>

      <div className="relative z-10 py-32 px-6">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Experience Highlights
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {experienceHighlights.map((exp) => (
            <Link key={exp.id} href={`/experience/${exp.slug}`}>
              <CardSpotlight className="h-full cursor-pointer transition-transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <exp.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                </div>
                <p className="text-lg font-semibold text-primary/90 mb-3">{exp.role}</p>
                <p className="text-neutral-300 leading-relaxed">{exp.description}</p>
              </CardSpotlight>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative z-10 py-20 overflow-hidden">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 text-white"></h2>
        <CurvedLoop
          marqueeText="Full Stack ✦"
          speed={2}
          direction="left"
          interactive={true}
          className="text-white/80"
        />
        <CurvedLoop
          marqueeText="AI ✦ ML ✦"
          speed={2.5}
          direction="right"
          interactive={true}
          className="text-primary/80"
        />
        <CurvedLoop
          marqueeText="Creative ✦ Leadership ✦"
          speed={1.8}
          direction="left"
          interactive={true}
          className="text-accent/80"
        />
      </div>

      {/* Contact Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent via-background/60 to-background pt-20">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-12 text-white">Contact</h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:barunsahoo04@gmail.com"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 hover:bg-primary/30 transition-all"
            >
              <Mail className="w-6 h-6" />
              <span className="font-medium">Email</span>
            </a>

            <a
              href="https://www.linkedin.com/in/barun-sahoo-164283262/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 hover:bg-primary/30 transition-all"
            >
              <Linkedin className="w-6 h-6" />
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href="https://drive.google.com/file/d/1tT_JqpNs7OzmZgRJFQ3ZnkWNGeBx_pPJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent/20 backdrop-blur-xl border border-accent/30 hover:bg-accent/30 transition-all"
            >
              <FileText className="w-6 h-6" />
              <span className="font-medium">Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
