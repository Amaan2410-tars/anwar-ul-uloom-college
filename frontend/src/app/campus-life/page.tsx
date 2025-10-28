export default function CampusLife() {
  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Campus Life</h1>
        <p className="text-lg text-gray-700 mb-12">
          Experience a vibrant and enriching campus life at Anwar-ul-Uloom College.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold mb-2">Cultural Events</h3>
            <p className="text-gray-700">Participate in various cultural celebrations and events throughout the year.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">⚽</div>
            <h3 className="text-xl font-semibold mb-2">Sports & Games</h3>
            <p className="text-gray-700">State-of-the-art sports facilities for cricket, football, basketball, and more.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Library</h3>
            <p className="text-gray-700">Extensive collection of books, journals, and digital resources.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">🏋️</div>
            <h3 className="text-xl font-semibold mb-2">Gymnasium</h3>
            <p className="text-gray-700">Modern fitness center with latest equipment.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Clubs & Societies</h3>
            <p className="text-gray-700">Join various student clubs and pursue your interests.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">Cafeteria</h3>
            <p className="text-gray-700">Clean, hygienic food court serving delicious meals.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
