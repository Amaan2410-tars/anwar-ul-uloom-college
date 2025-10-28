import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
  const values = [
    {
      title: 'Excellence',
      description: 'Striving for the highest standards in all academic pursuits',
      icon: '⭐'
    },
    {
      title: 'Integrity',
      description: 'Upholding ethical values and moral principles',
      icon: '🤝'
    },
    {
      title: 'Innovation',
      description: 'Encouraging creativity and out-of-the-box thinking',
      icon: '💡'
    },
    {
      title: 'Inclusivity',
      description: 'Embracing diversity and fostering inclusive environment for all',
      icon: '🌍'
    }
  ]

  const timeline = [
    { year: '1985', event: 'College Established' },
    { year: '1995', event: 'First NAAC Accreditation' },
    { year: '2005', event: 'A Grade Achieved' },
    { year: '2020', event: 'A+ Grade with CGPA 3.65' },
    { year: '2024', event: 'New Research Labs Inaugurated' }
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
            <h1 className="text-5xl font-bold mb-6">About Anwar-ul-Uloom College</h1>
            <p className="text-xl opacity-90">
              A legacy of excellence spanning four decades of transformative education
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our History</h2>
              <p className="text-gray-600 mb-4">
                Established in 1985, Anwar-ul-Uloom College has been a beacon of educational excellence 
                in Hyderabad and beyond. What started as a small institution with a vision has grown into 
                one of the most prestigious colleges in the region.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we have consistently maintained our commitment to providing quality education 
                that prepares students not just for careers, but for life. Our alumni network spans across 
                the globe, with graduates making significant contributions in various fields.
              </p>
              <p className="text-gray-600">
                Today, we stand proud with an A+ NAAC accreditation, state-of-the-art infrastructure, and a 
                team of dedicated faculty members who continue to inspire and guide thousands of students every year.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
                alt="College Campus"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To provide transformative education that empowers students with knowledge, skills, and values 
                necessary to succeed in a rapidly changing world. We are committed to fostering academic excellence, 
                research innovation, and holistic development of every student.
              </p>
              <p className="text-gray-600">
                We strive to create a learning environment that encourages critical thinking, creativity, and 
                social responsibility, preparing our students to be leaders and innovators in their chosen fields.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To be recognized as a world-class institution of higher education, known for academic excellence, 
                innovative research, and producing graduates who make meaningful contributions to society.
              </p>
              <p className="text-gray-600">
                We envision a future where our college stands as a beacon of knowledge and wisdom, inspiring 
                generations to come and creating a positive impact on local, national, and global communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center mb-8"
              >
                <div className="w-32 text-2xl font-bold text-primary">{item.year}</div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-800 font-medium">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl font-bold mb-6">Join Our Legacy</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of a community that values excellence, innovation, and integrity
            </p>
            <Link
              to="/admissions"
              className="inline-block px-10 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

