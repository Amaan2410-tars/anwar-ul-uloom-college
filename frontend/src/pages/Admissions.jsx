import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const Admissions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    course: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await axios.post('/api/students/apply', formData)
      setSubmitStatus({ type: 'success', message: 'Application submitted successfully! We will contact you soon.' })
      setFormData({ name: '', email: '', phone: '', dob: '', course: '', address: '' })
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit application. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const admissionProcess = [
    { step: 1, title: 'Online Application', description: 'Fill and submit the application form' },
    { step: 2, title: 'Document Verification', description: 'Submit required documents for verification' },
    { step: 3, title: 'Entrance Test/Interview', description: 'Attend the entrance examination or interview' },
    { step: 4, title: 'Merit List', description: 'Check the merit list published on our website' },
    { step: 5, title: 'Fee Payment', description: 'Complete fee payment and confirm admission' }
  ]

  const courses = [
    'Bachelor of Science (B.Sc)',
    'Bachelor of Commerce (B.Com)',
    'Bachelor of Arts (B.A)',
    'Bachelor of Computer Applications (BCA)',
    'Master of Science (M.Sc)',
    'Master of Commerce (M.Com)',
    'Master of Arts (M.A)',
    'Diploma in Computer Applications',
    'Diploma in Financial Management'
  ]

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
            <h1 className="text-5xl font-bold mb-6">Admissions Open 2024</h1>
            <p className="text-xl opacity-90">
              Begin your journey towards excellence. Apply now for the academic year 2024-25
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Admission Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple 5-step process to join our college
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {admissionProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start mb-8"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {process.step}
                </div>
                <div className="ml-6 flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Online Application Form</h2>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Interested In <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your address (optional)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Important Dates</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              { event: 'Application Opens', date: 'June 1, 2024' },
              { event: 'Last Date to Apply', date: 'July 31, 2024' },
              { event: 'Entrance Test', date: 'August 15, 2024' },
              { event: 'Results Announcement', date: 'August 25, 2024' },
              { event: 'Classes Begin', date: 'September 1, 2024' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
              >
                <span className="text-lg font-medium text-gray-800">{item.event}</span>
                <span className="text-primary font-bold">{item.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admissions

