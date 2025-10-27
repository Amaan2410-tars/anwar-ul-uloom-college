require('dotenv').config()
const express = require('express')
const supabase = require('./config/supabase')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()

// Import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const courseRoutes = require('./routes/courses')
const departmentRoutes = require('./routes/departments')
const noticeRoutes = require('./routes/notices')
const eventRoutes = require('./routes/events')
// const paymentRoutes = require('./routes/payments') // Temporarily disabled
// const certificateRoutes = require('./routes/certificates') // Temporarily disabled

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// Test Supabase connection
const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error && error.message !== 'Auth session missing!') {
      throw error
    }
    console.log('✅ Supabase connected successfully')
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message)
  }
}

testSupabaseConnection()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/events', eventRoutes)
// app.use('/api/payments', paymentRoutes) // Temporarily disabled
// app.use('/api/certificates', certificateRoutes) // Temporarily disabled

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

module.exports = app
