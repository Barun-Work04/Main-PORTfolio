import Aurora from "@/components/aurora"

const skillCategories = [
  {
    category: "Programming Languages & Frameworks",
    skills: ["Python", "Java", "C++", "SQL"],
  },
  {
    category: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Python", "REST APIs", "Database Design", "Server Architecture","MongoDB", "SQL"],
  },
  {
    category: "AI & Machine Learning",
    skills: ["TensorFlow", "Keras", "CNN", "Computer Vision", "Deep Learning", "Model Training","RAG CONCEPTS"],
  },
  {
    category: "Tools & Technologies",
    skills: ["Git","Canva", "Photoshop", "Premiere Pro", "Jupyter Notebooks"],
  },
]

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />


      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pb-12 pt-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-6xl md:text-7xl font-bold mb-16 text-white text-center">Skills</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.category}
                className="backdrop-blur-xl bg-card/30 p-8 rounded-3xl border border-primary/20"
              >
                <h2 className="font-heading text-2xl font-semibold mb-6 text-primary">{category.category}</h2>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
