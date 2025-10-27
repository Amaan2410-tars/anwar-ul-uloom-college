import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import FeaturedCourses from '@/components/FeaturedCourses'
import NewsAndEvents from '@/components/NewsAndEvents'
import Stats from '@/components/Stats'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <AboutSection />
      <FeaturedCourses />
      <NewsAndEvents />
      <CTA />
    </main>
  )
}
