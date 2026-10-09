import Aurora from "@/components/aurora"

export default function AboutPage() {
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
          <h1 className="font-heading text-6xl md:text-7xl font-bold mb-12 text-white text-center">About Me</h1>

          <div className="space-y-8 text-lg md:text-xl leading-relaxed backdrop-blur-xl bg-card/30 p-12 rounded-3xl border border-primary/20">
            <p>
              My name is <span className="text-accent font-semibold"> Barun Sahoo</span>, and my relationship with technology has always been rooted in curiosity. What
              began as a simple urge to understand how websites function gradually evolved into a deeper commitment to
              building complete, well-structured systems. Today, I work across full-stack web development, designing
              intuitive frontends, developing reliable backend architectures, and shaping applications that feel cohesive,
              scalable, and intentional.
            </p>

            <p>
              As my technical foundation strengthened, I found myself drawn toward artificial intelligence and machine
              learning. Rather than treating AI as a separate domain, I explored how intelligent systems could naturally
              integrate into real products. This led me to work with data pipelines, machine learning models, and
              <span className="text-accent font-semibold"> CNN-based facial emotion recognition</span> systems, applying
              them to practical problems where intelligence enhances usability rather than complicates it.
            </p>

            <p>
              Along the way, professional experiences exposed me to real-world development environments where I
              contributed across both frontend and backend workflows. I worked on building features, structuring logic,
              and supporting systems that required consistency, performance, and clarity. In parallel, I explored
              AI-assisted workflows and AI-powered content and video creation, learning how technical execution and
              creative storytelling can complement each other when aligned with purpose.
            </p>

            <p>
              Beyond engineering, I stepped into leadership and coordination roles that shaped how I approach teamwork
              and responsibility. Managing digital platforms, collaborating on public-facing initiatives, and contributing
              to large-scale conclaves taught me that strong technical solutions emerge not just from clean code, but from
              communication, ownership, and shared vision. I have actively taken leadership and communication roles
              through <span className="text-primary font-semibold">Citizen for Public Leadership (CPL)</span>, where I
              managed digital presence, coordinated campaigns, and worked as a core member of the CPL Policy Conclave 2025
              in Delhi.
            </p>

            <p>
              I am currently pursuing my engineering degree at
              <span className="text-primary font-semibold"> Sikkim Manipal Institute of Technology</span> (2023–2027),
              where I continue to refine my skills in full-stack development and AI/ML while expanding my understanding
              of system design and product thinking. Looking ahead, I am focused on building technology that is thoughtful,
              intelligent, and durable — systems that solve real problems and grow gracefully over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
