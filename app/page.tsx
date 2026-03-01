import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ClientsSection } from "@/components/clients-section"
import { CtaSection } from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ClientsSection />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
