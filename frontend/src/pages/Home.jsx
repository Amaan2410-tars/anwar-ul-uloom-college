import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

const Home = () => {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('/api/announcements')
      setAnnouncements(response.data.slice(0, 3)) // Show only 3 latest
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
    }
  }

  const stats = [
    { number: '15,000+', label: 'Students Enrolled' },
    { number: '500+', label: 'Faculty Members' },
    { number: '95%', label: 'Placement Rate' },
    { number: 'A+', label: 'NAAC Grade' }
  ]

  const highlights = [
    {
      icon: '🎓',
      title: 'Quality Education',
      description: 'World-class curriculum and experienced faculty'
    },
    {
      icon: '🏆',
      title: 'Excellent Placements',
      description: '95% placement rate with top companies'
    },
    {
      icon: '🔬',
      title: 'Research Excellence',
      description: 'State-of-the-art labs and research facilities'
    },
    {
      icon: '🌍',
      title: 'Global Recognition',
      description: 'NAAC accredited and internationally recognized'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="absolute inset-0 bg-opacity-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=2000')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Anwar-ul-Uloom College</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Excellence in Education, Empowering Generations Since 1985
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Apply Now
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to providing world-class education and nurturing the leaders of tomorrow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{highlight.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Announcements</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {announcements.length > 0 ? (
              announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {announcement.type}
                    </span>
                    <span className="ml-auto text-gray-500 text-sm">{announcement.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                  <p className="text-gray-600">{announcement.description}</p>
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">No announcements available</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of successful students and become part of our legacy of excellence
            </p>
            <Link
              to="/admissions"
              className="inline-block px-10 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Apply for Admission
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

