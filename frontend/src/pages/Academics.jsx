import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Academics = () => {
  const undergraduatePrograms = [
    {
      name: 'Bachelor of Science (B.Sc)',
      duration: '3 Years',
      eligibility: '10+2 with Science',
      description: 'Specializations in Physics, Chemistry, Mathematics, Computer Science, and Biotechnology',
      intakes: 120
    },
    {
      name: 'Bachelor of Commerce (B.Com)',
      duration: '3 Years',
      eligibility: '10+2 with Commerce/Any',
      description: 'Comprehensive commerce education with emphasis on accounting, finance, and business management',
      intakes: 150
    },
    {
      name: 'Bachelor of Arts (B.A)',
      duration: '3 Years',
      eligibility: '10+2 with Any Stream',
      description: 'Programs in English, History, Political Science, Sociology, and Psychology',
      intakes: 100
    },
    {
      name: 'Bachelor of Computer Applications (BCA)',
      duration: '3 Years',
      eligibility: '10+2 with Mathematics',
      description: 'Focus on programming, software development, and IT fundamentals',
      intakes: 80
    }
  ]

  const postgraduatePrograms = [
    {
      name: 'Master of Science (M.Sc)',
      duration: '2 Years',
      eligibility: 'B.Sc in Relevant Field',
      description: 'Advanced programs in Computer Science, Mathematics, Physics, and Chemistry',
      intakes: 30
    },
    {
      name: 'Master of Commerce (M.Com)',
      duration: '2 Years',
      eligibility: 'B.Com or BBA',
      description: 'Advanced studies in commerce, finance, and business analytics',
      intakes: 40
    },
    {
      name: 'Master of Arts (M.A)',
      duration: '2 Years',
      eligibility: 'B.A in Relevant Field',
      description: 'Specialized programs in English Literature, History, and Psychology',
      intakes: 25
    }
  ]

  const diplomaPrograms = [
    {
      name: 'Diploma in Computer Applications',
      duration: '1 Year',
      eligibility: '10+2 Any Stream',
      description: 'Practical training in computer applications and office automation',
      intakes: 60
    },
    {
      name: 'Diploma in Financial Management',
      duration: '1 Year',
      eligibility: 'Graduate in Any Field',
      description: 'Professional certification in financial planning and management',
      intakes: 40
    }
  ]

  const renderCourseCard = (course, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
    >
      <h3 className="text-2xl font-bold text-primary mb-3">{course.name}</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          ⏱ {course.duration}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          👥 {course.intakes} Seats
        </span>
      </div>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Eligibility:</p>
        <p className="font-medium text-gray-800">{course.eligibility}</p>
      </div>
      <button className="text-primary font-semibold hover:text-primary-dark transition">
        Know More →
      </button>
    </motion.div>
  )

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
            <h1 className="text-5xl font-bold mb-6">Academics</h1>
            <p className="text-xl opacity-90">
              Explore our comprehensive range of undergraduate, postgraduate, and diploma programs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Undergraduate Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Undergraduate Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three-year degree programs designed to provide strong foundation in your chosen field
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {undergraduatePrograms.map((program, index) => renderCourseCard(program, index))}
          </div>
        </div>
      </section>

      {/* Postgraduate Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Postgraduate Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced two-year programs for deeper specialization and career advancement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {postgraduatePrograms.map((program, index) => renderCourseCard(program, index))}
          </div>
        </div>
      </section>

      {/* Diploma Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Diploma Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              One-year skill-oriented programs for quick career entry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {diplomaPrograms.map((program, index) => renderCourseCard(program, index))}
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
            <h2 className="text-4xl font-bold mb-6">Ready to Apply?</h2>
            <p className="text-xl mb-8 opacity-90">
              Take the next step in your educational journey with us
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

export default Academics

