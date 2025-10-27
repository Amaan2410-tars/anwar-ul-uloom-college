'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Join thousands of students who have transformed their lives at
            Anwar-ul-Uloom College. Start your application today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/admissions/prospectus.pdf"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              <span>Download Prospectus</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
