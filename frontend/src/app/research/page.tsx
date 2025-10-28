export default function Research() {
  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Research</h1>
        <p className="text-lg text-gray-700 mb-12">
          Our research initiatives contribute to knowledge advancement and innovation.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Areas</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-gray-800">Artificial Intelligence & Machine Learning</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-gray-800">Sustainable Technologies</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-gray-800">Social Sciences & Humanities</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-gray-800">Business & Economics</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
