import FeaturedCourses from '@/components/FeaturedCourses'

export default function Academics() {
  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Academics</h1>
        <p className="text-lg text-gray-700 mb-12">
          Explore our comprehensive academic programs designed to prepare you for success.
        </p>
        
        <FeaturedCourses />
      </div>
    </main>
  )
}
