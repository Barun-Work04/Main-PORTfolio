import Link from "next/link"
import { CreativeHero } from "@/components/creative/creative-hero"
import { FeaturedFilm } from "@/components/creative/featured-film"
import { MagneticLink } from "@/components/creative/magnetic-link"
import { Marquee } from "@/components/creative/marquee"
import { ProcessFlip } from "@/components/creative/process-flip"
import { ReelsStrip } from "@/components/creative/reels-strip"
import { RevealWords, Rise } from "@/components/creative/reveal"
import { ServiceNotes } from "@/components/creative/service-notes"
import { WorkTabs } from "@/components/creative/work-tabs"

const sectionClass = "mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 md:py-32"
const h2Class = "mb-12 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl"

// Layout families: hero, marquee band, paper mat, folder tabs, scroll-snap strip, card carousel, paper notes, closing statement.
export default function CreativePage() {
  return (
    // overflow-x-clip: slide-in elements start off-screen and must not widen the page on phones
    <main className="overflow-x-clip">
      <CreativeHero />
      <Marquee />

      <section className={sectionClass}>
        <RevealWords text="Featured film" className={h2Class} />
        <FeaturedFilm id="nvoNiJMCz-Q" title="Filmmaking competition" />
      </section>

      <section id="work" className={sectionClass}>
        <RevealWords text="Selected work" className={h2Class} />
        <WorkTabs />
      </section>

      <section className={`${sectionClass} md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-16`}>
        <RevealWords text="Made for the phone" className={h2Class} />
        <div className="min-w-0 md:max-w-[620px]">
          <ReelsStrip />
        </div>
      </section>

      <section className={sectionClass}>
        <RevealWords text="How a film gets made" className={h2Class} />
        <ProcessFlip />
      </section>

      <section className={sectionClass}>
        <RevealWords text="Work with me" className={h2Class} />
        <ServiceNotes />
      </section>

      <section className="px-6 pb-16 pt-24 text-center md:pt-40">
        <Rise>
          <h2 className="mx-auto max-w-[16ch] text-5xl font-semibold leading-[1.02] tracking-tighter md:text-8xl">
            Have{" "}
            {/* Lowe: an italic serif phrase on a highlighter block */}
            <span className="inline-block -rotate-1 bg-[var(--c-accent)] px-3 pb-2 font-[family-name:var(--font-serif)] font-semibold italic text-white">
              a story
            </span>{" "}
            to film?
          </h2>
        </Rise>
        <MagneticLink
          href="mailto:barunsahoo04@gmail.com"
          className="mt-10 bg-[var(--c-accent)] px-8 py-4 text-base text-white"
        >
          Start a project
        </MagneticLink>
        <p className="mt-24 text-sm text-[var(--c-paper)]/70">
          Barun Sahoo. Looking for the code side?{" "}
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            Tech portfolio
          </Link>
        </p>
      </section>
    </main>
  )
}
