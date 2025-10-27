require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const Department = require('../models/Department')
const Course = require('../models/Course')
const Notice = require('../models/Notice')
const Event = require('../models/Event')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/anwarululoom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Clear existing data
    await User.deleteMany({})
    await Department.deleteMany({})
    await Course.deleteMany({})
    await Notice.deleteMany({})
    await Event.deleteMany({})

    console.log('✅ Existing data cleared')

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@college.test',
      password: 'AdminPass123',
      role: 'admin',
      studentId: 'ADMIN001',
      isEmailVerified: true
    })
    console.log('✅ Admin user created:', admin.email)

    // Create Departments
    const departments = await Department.insertMany([
      {
        name: 'Computer Science',
        code: 'CS',
        description: 'Computer Science and Engineering Department',
        email: 'cs@anwarululoom.edu',
        phone: '+91 1234567890'
      },
      {
        name: 'Electronics and Communication',
        code: 'ECE',
        description: 'Electronics and Communication Engineering Department',
        email: 'ece@anwarululoom.edu',
        phone: '+91 1234567891'
      },
      {
        name: 'Business Administration',
        code: 'MBA',
        description: 'Master of Business Administration',
        email: 'mba@anwarululoom.edu',
        phone: '+91 1234567892'
      }
    ])
    console.log(`✅ ${departments.length} departments created`)

    // Create Courses
    const courses = await Course.insertMany([
      {
        name: 'Bachelor of Technology in Computer Science',
        code: 'B.TECH-CS',
        description: '4-year B.Tech program in Computer Science',
        duration: 4,
        department: departments[0]._id,
        eligibility: '10+2 with PCM',
        fees: {
          semester: 50000,
          annual: 90000
        },
        intake: 120
      },
      {
        name: 'Bachelor of Technology in Electronics',
        code: 'B.TECH-ECE',
        description: '4-year B.Tech program in Electronics and Communication',
        duration: 4,
        department: departments[1]._id,
        eligibility: '10+2 with PCM',
        fees: {
          semester: 45000,
          annual: 85000
        },
        intake: 60
      },
      {
        name: 'Master of Business Administration',
        code: 'MBA',
        description: '2-year MBA program',
        duration: 2,
        department: departments[2]._id,
        eligibility: 'Graduation with 50%',
        fees: {
          semester: 75000,
          annual: 140000
        },
        intake: 60
      }
    ])
    console.log(`✅ ${courses.length} courses created`)

    // Create Sample Students
    const students = await User.insertMany([
      {
        name: 'Ahmed Ali',
        email: 'ahmed.ali@student.anwarululoom.edu',
        password: 'Student123',
        role: 'student',
        studentId: 'S001',
        department: departments[0]._id,
        course: courses[0]._id,
        semester: 3,
        phone: '+91 9876543210',
        isEmailVerified: true
      },
      {
        name: 'Fatima Khan',
        email: 'fatima.khan@student.anwarululoom.edu',
        password: 'Student123',
        role: 'student',
        studentId: 'S002',
        department: departments[1]._id,
        course: courses[1]._id,
        semester: 5,
        phone: '+91 9876543211',
        isEmailVerified: true
      },
      {
        name: 'Hassan Sheikh',
        email: 'hassan.sheikh@student.anwarululoom.edu',
        password: 'Student123',
        role: 'student',
        studentId: 'S003',
        department: departments[2]._id,
        course: courses[2]._id,
        semester: 1,
        phone: '+91 9876543212',
        isEmailVerified: true
      },
      {
        name: 'Zainab Ahmed',
        email: 'zainab.ahmed@student.anwarululoom.edu',
        password: 'Student123',
        role: 'student',
        studentId: 'S004',
        department: departments[0]._id,
        course: courses[0]._id,
        semester: 7,
        phone: '+91 9876543213',
        isEmailVerified: true
      },
      {
        name: 'Omar Hussein',
        email: 'omar.hussein@student.anwarululoom.edu',
        password: 'Student123',
        role: 'student',
        studentId: 'S005',
        department: departments[1]._id,
        course: courses[1]._id,
        semester: 3,
        phone: '+91 9876543214',
        isEmailVerified: true
      }
    ])
    console.log(`✅ ${students.length} students created`)

    // Create Sample Notices
    const notices = await Notice.insertMany([
      {
        title: 'Semester Exam Schedule Released',
        content: 'The schedule for semester examinations has been released. Please check your student portal for details.',
        category: 'academic',
        priority: 'high',
        targetAudience: ['students'],
        isPublished: true,
        publishedAt: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Admission Open for Academic Year 2024-25',
        content: 'Admissions are now open for various undergraduate and postgraduate programs. Apply now!',
        category: 'admission',
        priority: 'high',
        targetAudience: ['all'],
        isPublished: true,
        publishedAt: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Tech Fest 2024 Registration',
        content: 'Register now for the annual tech fest. Last date: March 1, 2024',
        category: 'general',
        priority: 'normal',
        targetAudience: ['students'],
        isPublished: true,
        publishedAt: new Date(),
        createdBy: admin._id
      }
    ])
    console.log(`✅ ${notices.length} notices created`)

    // Create Sample Events
    const events = await Event.insertMany([
      {
        title: 'Annual Tech Fest 2024',
        description: 'Join us for three days of innovation, technology, and networking.',
        category: 'cultural',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-17'),
        venue: 'Main Auditorium',
        organizer: 'Student Council',
        maxParticipants: 500,
        isPublished: true,
        createdBy: admin._id
      },
      {
        title: 'Career Counseling Workshop',
        description: 'Get expert advice on career planning and skill development.',
        category: 'workshop',
        startDate: new Date('2024-02-20'),
        endDate: new Date('2024-02-20'),
        venue: 'Conference Hall',
        organizer: 'Placement Cell',
        isPublished: true,
        createdBy: admin._id
      }
    ])
    console.log(`✅ ${events.length} events created`)

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📝 Login Credentials:')
    console.log('Admin:', 'admin@college.test / AdminPass123')
    console.log('Students: Use student email with password Student123\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()
