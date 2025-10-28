import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [activeTab, setActiveTab] = useState('students')
  const [students, setStudents] = useState([])
  const [departments, setDepartments] = useState([])
  const [announcements, setAnnouncements] = useState([])
  
  // Form states
  const [newDept, setNewDept] = useState({ name: '', description: '', hod: '', faculty: '' })
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '', type: 'general', date: new Date().toISOString().split('T')[0] })

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn')
    if (loggedIn === 'true') {
      setIsLoggedIn(true)
      fetchData()
    }
  }, [])

  const fetchData = async () => {
    try {
      const [studentsRes, deptsRes, annRes] = await Promise.all([
        axios.get('/api/students'),
        axios.get('/api/departments'),
        axios.get('/api/announcements')
      ])
      setStudents(studentsRes.data)
      setDepartments(deptsRes.data)
      setAnnouncements(annRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/admin/login', loginData)
      if (response.data.success) {
        localStorage.setItem('adminLoggedIn', 'true')
        setIsLoggedIn(true)
        fetchData()
      }
    } catch (error) {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    setIsLoggedIn(false)
    setLoginData({ username: '', password: '' })
  }

  const approveStudent = async (id) => {
    try {
      await axios.put(`/api/students/${id}/approve`)
      fetchData()
      alert('Student approved successfully!')
    } catch (error) {
      alert('Failed to approve student')
    }
  }

  const rejectStudent = async (id) => {
    try {
      await axios.put(`/api/students/${id}/reject`)
      fetchData()
      alert('Student rejected')
    } catch (error) {
      alert('Failed to reject student')
    }
  }

  const handleAddDepartment = async (e) => {
    e.preventDefault()
    try {
      const facultyArray = newDept.faculty.split(',').map(f => f.trim()).filter(f => f)
      await axios.post('/api/departments', {
        ...newDept,
        faculty: facultyArray
      })
      fetchData()
      setNewDept({ name: '', description: '', hod: '', faculty: '' })
      alert('Department added successfully!')
    } catch (error) {
      alert('Failed to add department')
    }
  }

  const handleDeleteDepartment = async (id) => {
    if (confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`/api/departments/${id}`)
        fetchData()
        alert('Department deleted successfully!')
      } catch (error) {
        alert('Failed to delete department')
      }
    }
  }

  const handleAddAnnouncement = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/announcements', newAnnouncement)
      fetchData()
      setNewAnnouncement({ title: '', description: '', type: 'general', date: new Date().toISOString().split('T')[0] })
      alert('Announcement added successfully!')
    } catch (error) {
      alert('Failed to add announcement')
    }
  }

  const handleDeleteAnnouncement = async (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      try {
        await axios.delete(`/api/announcements/${id}`)
        fetchData()
        alert('Announcement deleted successfully!')
      } catch (error) {
        alert('Failed to delete announcement')
      }
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Admin Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="admin@college.com"
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
                  placeholder="admin123"
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
              Demo credentials: admin@college.com / admin123
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
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage students, departments, and announcements</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === 'students' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === 'departments' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === 'announcements' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Announcements
            </button>
          </div>
        </div>

        {/* Students Tab */}
        {activeTab === 'students' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">Student Applications</h2>
            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Course</th>
                      <th className="px-4 py-3 text-left">Applied On</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-t">
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3">{student.email}</td>
                        <td className="px-4 py-3">{student.course}</td>
                        <td className="px-4 py-3">{new Date(student.appliedAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            student.status === 'approved' ? 'bg-green-100 text-green-800' :
                            student.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {student.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveStudent(student.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => rejectStudent(student.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No student applications</p>
            )}
          </motion.div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Add Department Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Add New Department</h2>
              <form onSubmit={handleAddDepartment} className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Department Name"
                  value={newDept.name}
                  onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Head of Department"
                  value={newDept.hod}
                  onChange={(e) => setNewDept({ ...newDept, hod: e.target.value })}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={newDept.description}
                  onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Faculty (comma separated)"
                  value={newDept.faculty}
                  onChange={(e) => setNewDept({ ...newDept, faculty: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="md:col-span-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Add Department
                </button>
              </form>
            </div>

            {/* Departments List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Departments List</h2>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{dept.name}</h3>
                      <p className="text-gray-600">{dept.description}</p>
                      <p className="text-sm text-gray-500 mt-1">HOD: {dept.hod}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteDepartment(dept.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Add Announcement Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Add Announcement</h2>
              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={newAnnouncement.description}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    value={newAnnouncement.type}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="general">General</option>
                    <option value="admission">Admission</option>
                    <option value="event">Event</option>
                    <option value="exam">Exam</option>
                  </select>
                  <input
                    type="date"
                    value={newAnnouncement.date}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                    required
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Add Announcement
                </button>
              </form>
            </div>

            {/* Announcements List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Announcements</h2>
              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{ann.title}</h3>
                        <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">{ann.type}</span>
                      </div>
                      <p className="text-gray-600">{ann.description}</p>
                      <p className="text-sm text-gray-500 mt-2">{ann.date}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel

