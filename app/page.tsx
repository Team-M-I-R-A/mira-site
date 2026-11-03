import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MobileMoneySection from "@/components/MobileMoneySection";
import HowToPublish from "@/components/HowToPublish";
import Installer from "@/components/Installer";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-950">
      <Navbar />
      <Hero />
      <HowItWorks />
      <MobileMoneySection />
      <HowToPublish />
      <Installer />
      <Footer />
      <ChatbotWidget />
      <Analytics />
    </main>
  );
}
