import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WaveDivider from "@/components/WaveDivider";
import Influencers from "@/components/Influencers";
import Service from "@/components/Service";
import ProofVideo from "@/components/ProofVideo";
import Reviews from "@/components/Reviews";
import PainPoints from "@/components/PainPoints";
import Beneficiaires from "@/components/Beneficiaires";
import Team from "@/components/Team";
import Founder from "@/components/Founder";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import StickyBottomCTA from "@/components/StickyBottomCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <StickyBottomCTA />
      <main>
        {/* DARK */}
        <Hero />
        <WaveDivider topColor="#091a0f" bottomColor="#f8f5ef" />

        {/* LIGHT */}
        <Influencers />
        <WaveDivider topColor="#f8f5ef" bottomColor="#091a0f" />

        {/* DARK */}
        <Service />
        <WaveDivider topColor="#091a0f" bottomColor="#f8f5ef" />

        {/* LIGHT */}
        <ProofVideo />
        <WaveDivider topColor="#f8f5ef" bottomColor="#0c1e12" />

        {/* DARK ALT */}
        <Reviews />
        <WaveDivider topColor="#0c1e12" bottomColor="#f8f5ef" />

        {/* LIGHT */}
        <PainPoints />
        <WaveDivider topColor="#f8f5ef" bottomColor="#091a0f" />

        {/* DARK */}
        <Beneficiaires />
        <WaveDivider topColor="#091a0f" bottomColor="#f8f5ef" />

        {/* LIGHT */}
        <Team />
        <WaveDivider topColor="#f8f5ef" bottomColor="#0c1e12" />

        {/* DARK ALT */}
        <Founder />
        <WaveDivider topColor="#0c1e12" bottomColor="#f8f5ef" />

        {/* LIGHT */}
        <FAQ />
        <WaveDivider topColor="#f8f5ef" bottomColor="#091a0f" />

        {/* DARK + Footer */}
        <FinalCTA />
      </main>
    </>
  );
}
