import Hero from "@/components/hero";
import Features from "@/components/features";
import Stats from "@/components/stats";
import HowItWorks from "@/components/how-it-works";
import Tokenomics from "@/components/tokenomics";
import SecurityAudit from "@/components/security-audit";
import Roadmap from "@/components/roadmap";
import Partners from "@/components/partners";
export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Tokenomics />
      <SecurityAudit />
      <Roadmap />
      <Partners />
    </main>
  );
}
