import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { ProjectsSection } from "@/components/sections/projects"
import { AboutSection } from "@/components/sections/about"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
