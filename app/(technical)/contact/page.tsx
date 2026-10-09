import Aurora from "@/components/aurora"
import { Mail, Linkedin, FileText } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />


      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pb-12 pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-6xl md:text-7xl font-bold mb-8 text-white">Get In Touch</h1>

          <p className="text-xl text-foreground/80 mb-16 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            <a
              href="mailto:barunsahoo04@gmail.com"
              className="backdrop-blur-xl bg-card/30 p-8 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all group"
            >
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-xl font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground break-all">barunsahoo04@gmail.com</p>
            </a>

            <a
              href="https://www.linkedin.com/in/barun-sahoo-164283262/"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-xl bg-card/30 p-8 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all group"
            >
              <Linkedin className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-xl font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">Connect with me</p>
            </a>

            <a
              href="https://drive.google.com/file/d/1tT_JqpNs7OzmZgRJFQ3ZnkWNGeBx_pPJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-xl bg-card/30 p-8 rounded-3xl border border-accent/20 hover:border-accent/40 transition-all group"
            >
              <FileText className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-xl font-semibold mb-2">Resume</h3>
              <p className="text-sm text-muted-foreground">Download my CV</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
