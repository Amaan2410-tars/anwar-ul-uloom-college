import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'

export default function About() {
  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AboutSection />
        
        {/* Additional About Content */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Anwar-ul-Uloom College, we are committed to providing quality education 
            that empowers students to achieve their academic and professional goals. 
            Our mission is to foster academic excellence, innovation, and character 
            development in every student.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To be a leading institution of higher education that produces graduates 
            who are not only academically proficient but also ethically grounded and 
            socially responsible, contributing positively to society.
          </p>
        </section>
      </div>
    </main>
  )
}
