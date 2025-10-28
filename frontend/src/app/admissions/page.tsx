export default function Admissions() {
  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admissions</h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">2024-2025 Admissions Open</h2>
          <p className="text-blue-800 mb-4">
            Applications are now being accepted for the academic year 2024-2025. 
            Submit your application before the deadline to secure your spot.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Admission Process</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Step 1: Application</h3>
              <p className="text-gray-700">Fill out the online application form with your details.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Step 2: Documents</h3>
              <p className="text-gray-700">Submit required documents and transcripts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Step 3: Entrance Test</h3>
              <p className="text-gray-700">Appear for the entrance examination.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Step 4: Admission</h3>
              <p className="text-gray-700">Complete admission formalities and enroll.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
