import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import MobileMoneySection from '@/components/MobileMoneySection'
import AppShowcase from '@/components/AppShowcase'
import Testimonials from '@/components/Testimonials'
import Waitlist from '@/components/Waitlist'
import Footer from '@/components/Footer'
import ChatbotWidget from '@/components/ChatbotWidget'
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-950">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <MobileMoneySection />
      <AppShowcase />
      <Testimonials />
      <Waitlist />
      <Footer />
      <ChatbotWidget/>
      <Analytics/>
    </main>
  )
}
