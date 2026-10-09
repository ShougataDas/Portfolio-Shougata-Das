import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Shell } from "@/components/shell"
import { About, CompetitiveProgramming, Education, Experience, Projects, Skills } from "@/components/sections"
import { Contact, Footer } from "@/components/contact"

// Re-render once a day so the live Codeforces rating stays fresh.
export const revalidate = 86400

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-green focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <CompetitiveProgramming />
        <Contact />
      </main>
      <Footer />
      <Shell />
    </>
  )
}
