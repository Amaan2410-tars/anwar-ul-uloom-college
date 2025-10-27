'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Users, Award, Building2 } from 'lucide-react'

const Stats = () => {
  const stats = [
    {
      icon: GraduationCap,
      number: '5000+',
      label: 'Active Students',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      number: '200+',
      label: 'Faculty Members',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Award,
      number: '95%',
      label: 'Placement Rate',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Building2,
      number: '50+',
      label: 'Departments',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 -mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full mb-4 shadow-lg`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
