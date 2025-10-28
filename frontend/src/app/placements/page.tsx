export default function Placements() {
  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Placements</h1>
        <p className="text-lg text-gray-700 mb-12">
          Our placement cell works tirelessly to ensure our graduates find rewarding careers.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-yellow-900 mb-4">Placement Statistics 2024</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600">95%</p>
              <p className="text-yellow-800">Placement Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600">50+</p>
              <p className="text-yellow-800">Recruiting Companies</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600">₹8 LPA</p>
              <p className="text-yellow-800">Average Package</p>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Recruiters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['TCS', 'Infosys', 'Wipro', 'Accenture', 'Microsoft', 'Google', 'IBM', 'Amazon'].map((company) => (
              <div key={company} className="bg-white p-4 rounded-lg shadow text-center">
                <p className="font-semibold text-gray-800">{company}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
