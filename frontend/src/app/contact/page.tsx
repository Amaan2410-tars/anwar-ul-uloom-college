export default function Contact() {
  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-12">
          Get in touch with us for any inquiries or assistance.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Visit Us</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-green-500 mr-3">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-700">123 College Street, City, State - 123456</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3">📧</span>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-700">info@anwarululoom.edu</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-500 mr-3">📞</span>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-700">+91 1234567890</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Message</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea 
                rows={4}
                placeholder="Your Message" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
