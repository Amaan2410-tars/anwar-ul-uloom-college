import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/departments')
      setDepartments(response.data)
    } catch (error) {
      console.error('Failed to fetch departments:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">Our Departments</h1>
            <p className="text-xl opacity-90">
              Explore our academic departments and discover the diverse range of programs we offer
            </p>
          </motion.div>
        </div>
      </section>

      {/* Departments List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-3xl font-bold text-primary">{dept.name}</h2>
                    <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🎓</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{dept.description}</p>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-2">Head of Department</p>
                    <p className="font-semibold text-gray-800 mb-4">{dept.hod}</p>

                    <p className="text-sm text-gray-500 mb-2">Faculty Members</p>
                    <div className="flex flex-wrap gap-2">
                      {dept.faculty && dept.faculty.map((faculty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {faculty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="mt-6 text-primary font-semibold hover:text-primary-dark transition">
                    View Programs →
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Interested in a Department?</h2>
            <p className="text-xl mb-8 opacity-90">
              Reach out to learn more about specific programs and admission requirements
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Departments

