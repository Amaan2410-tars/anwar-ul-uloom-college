'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

const NewsAndEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Tech Fest 2024',
      date: 'March 15-17, 2024',
      location: 'Main Auditorium',
      description: 'Join us for three days of innovation, technology, and networking.',
      category: 'Event',
    },
    {
      id: 2,
      title: 'New Research Center Inauguration',
      date: 'April 5, 2024',
      location: 'Research Block',
      description: 'Inauguration of our state-of-the-art research facility.',
      category: 'News',
    },
    {
      id: 3,
      title: 'Placement Drive - Top Companies',
      date: 'May 1-10, 2024',
      location: 'Placement Cell',
      description: 'Career fair with 100+ companies offering internships and jobs.',
      category: 'Placement',
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
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              News & Events
            </h2>
            <div className="w-24 h-1 bg-primary-500"></div>
          </div>
          <Link
            href="/events"
            className="hidden md:flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs font-semibold rounded-full">
                    {event.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsAndEvents
