'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Clock } from 'lucide-react'

const FeaturedCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Computer Science & Engineering',
      department: 'Department of Computer Science',
      duration: '4 Years',
      students: 180,
      description: 'Comprehensive program covering software development, AI, and emerging technologies.',
      image: '/api/placeholder/400/250',
    },
    {
      id: 2,
      title: 'Business Administration',
      department: 'Department of Management',
      duration: '3 Years',
      students: 150,
      description: 'Develop leadership skills and business acumen with industry-relevant curriculum.',
      image: '/api/placeholder/400/250',
    },
    {
      id: 3,
      title: 'Electronics & Communication',
      department: 'Department of ECE',
      duration: '4 Years',
      students: 120,
      description: 'Explore the world of electronics, communication systems, and embedded technologies.',
      image: '/api/placeholder/400/250',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Programs
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Explore our diverse range of undergraduate and graduate programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-600 to-primary-800">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-primary-600">
                    {course.duration}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm text-primary-600 font-medium mb-2">
                  {course.department}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} Students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Undergraduate</span>
                  </div>
                </div>

                <Link
                  href={`/academics/courses/${course.id}`}
                  className="flex items-center justify-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/academics"
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <span>View All Programs</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCourses
