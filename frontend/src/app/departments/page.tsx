export default function Departments() {
  const departments = [
    { name: 'Computer Science', description: 'Advanced computing and programming', icon: '💻' },
    { name: 'Business Administration', description: 'Management and entrepreneurship', icon: '📊' },
    { name: 'Engineering', description: 'Innovation and technology', icon: '⚙️' },
    { name: 'Arts & Humanities', description: 'Literature, history, and culture', icon: '🎨' },
  ]

  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Departments</h1>
        <p className="text-lg text-gray-700 mb-12">
          Explore our diverse academic departments offering quality education.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{dept.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.name}</h3>
              <p className="text-gray-700">{dept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
