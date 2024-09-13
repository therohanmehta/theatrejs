"use client";

import Experience from "@/components/experience/Experience";
import HeroSection from "@/components/hero-section/HeroSection";
import WelcomeSection from "@/components/welcome-section/WelcomeSection";

export default function Home() {
  return (
    <div className="overflow-hidden w-100">
      <WelcomeSection />
      {/* <HeroSection /> */}
      <Experience />
      {/* hello? */}
    </div>
  );
}
