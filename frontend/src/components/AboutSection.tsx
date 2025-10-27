'use client'

import { motion } from 'framer-motion'
import { Award, Target, Heart, Users } from 'lucide-react'

const AboutSection = () => {
  const features = [
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Ranked among top institutions with world-class curriculum and distinguished faculty.',
    },
    {
      icon: Target,
      title: 'Research Focus',
      description: 'Cutting-edge research facilities and opportunities for innovative projects.',
    },
    {
      icon: Heart,
      title: 'Holistic Development',
      description: 'Nurturing not just academic growth but overall personality development.',
    },
    {
      icon: Users,
      title: 'Strong Alumni Network',
      description: 'Connect with 50,000+ alumni across the globe in diverse fields.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Anwar-ul-Uloom College
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Established with a vision to provide quality education and create
            future leaders, we have been transforming lives for decades.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To provide exceptional education that empowers students to excel in
              their chosen fields, fosters critical thinking, and prepares them to
              make meaningful contributions to society.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are committed to maintaining the highest standards of academic
              excellence while nurturing innovation, creativity, and ethical
              values in our students.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/api/placeholder/800/450"
                alt="College Campus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
