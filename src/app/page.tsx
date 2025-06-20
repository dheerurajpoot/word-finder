import { HeroSection } from "@/components/sections/hero-section"
import { DescriptionSection } from "@/components/sections/description-section"
import { PopularToolsSection } from "@/components/sections/popular-tools-section"
import { GameSupportSection } from "@/components/sections/game-support-section"
import { StatisticsSection } from "@/components/sections/statistics-section"
import { FeaturesSection } from "@/components/sections/features-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DescriptionSection />
      <PopularToolsSection />
      <GameSupportSection />
      <StatisticsSection />
      <FeaturesSection />
    </>
  )
}
