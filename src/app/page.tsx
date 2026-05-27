import HeroSection from '@/components/home/HeroSection'
import HotResources from '@/components/home/HotResources'
import HotDemands from '@/components/home/HotDemands'
import AIRecommendations from '@/components/home/AIRecommendations'
import SubscriptionBanner from '@/components/home/SubscriptionBanner'
import HowItWorks from '@/components/home/HowItWorks'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HotResources />
      <HotDemands />
      <AIRecommendations />
      <SubscriptionBanner />
      <HowItWorks />
    </>
  )
}