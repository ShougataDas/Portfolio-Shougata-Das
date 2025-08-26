import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { EducationSection } from "@/components/education-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { CompetitiveProgrammingSection } from "@/components/competitive-programming-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CompetitiveProgrammingSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-medium mb-2">Shougata Das</p>
          <p className="text-primary-foreground/80">Built with Next.js, Tailwind CSS, and lots of ☕</p>
          <p className="text-sm text-primary-foreground/60 mt-4">© 2025 Shougata Das. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
