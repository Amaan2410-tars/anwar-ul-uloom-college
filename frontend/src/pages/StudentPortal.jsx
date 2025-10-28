import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const StudentPortal = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    // Check if already logged in (simple check)
    const loggedIn = localStorage.getItem('studentLoggedIn')
    if (loggedIn === 'true') {
      setIsLoggedIn(true)
      fetchAnnouncements()
    }
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('/api/announcements')
      setAnnouncements(response.data)
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple login - in production, use proper authentication
    if (loginData.email && loginData.password) {
      localStorage.setItem('studentLoggedIn', 'true')
      localStorage.setItem('studentEmail', loginData.email)
      setIsLoggedIn(true)
      fetchAnnouncements()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('studentLoggedIn')
    localStorage.removeItem('studentEmail')
    setIsLoggedIn(false)
    setLoginData({ email: '', password: '' })
  }

  const studentInfo = {
    name: 'John Doe',
    email: localStorage.getItem('studentEmail') || 'student@example.com',
    rollNumber: '2024BCA001',
    course: 'Bachelor of Computer Applications',
    semester: '1st Semester'
  }

  const dummyAttendance = [
    { subject: 'Mathematics', present: 45, total: 50, percentage: 90 },
    { subject: 'Computer Science', present: 48, total: 50, percentage: 96 },
    { subject: 'English', present: 42, total: 50, percentage: 84 },
    { subject: 'Physics', present: 47, total: 50, percentage: 94 }
  ]

  const dummyResults = [
    { subject: 'Mathematics', marks: 85, grade: 'A' },
    { subject: 'Computer Science', marks: 92, grade: 'A+' },
    { subject: 'English', marks: 78, grade: 'B+' },
    { subject: 'Physics', marks: 88, grade: 'A' }
  ]

  if (!isLoggedIn) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Student Portal Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="student@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              For demo purposes, use any email and password
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Student Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {studentInfo.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">Profile Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-semibold">{studentInfo.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Roll Number</p>
              <p className="font-semibold">{studentInfo.rollNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{studentInfo.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Course</p>
              <p className="font-semibold">{studentInfo.course}</p>
            </div>
            <div>
              <p className="text-gray-600">Semester</p>
              <p className="font-semibold">{studentInfo.semester}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Attendance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">Attendance</h2>
            <div className="space-y-4">
              {dummyAttendance.map((item, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{item.subject}</h3>
                    <span className="text-sm text-gray-600">{item.present}/{item.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">Mid-Semester Results</h2>
            <div className="space-y-4">
              {dummyResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{result.subject}</h3>
                    <p className="text-sm text-gray-600">Grade: {result.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{result.marks}</p>
                    <p className="text-sm text-gray-600">out of 100</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Notices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">Notices & Announcements</h2>
          <div className="space-y-4">
            {announcements.length > 0 ? (
              announcements.map((notice) => (
                <div key={notice.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">{notice.title}</h3>
                    <span className="text-sm text-gray-500">{notice.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{notice.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No announcements available</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default StudentPortal

