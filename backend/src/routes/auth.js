const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { validate } = require('../middleware/validator')
const { protect } = require('../middleware/auth')
const {
  register,
  login,
  refreshToken,
  logout,
  getMe
} = require('../controllers/authController')

// Register
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
], register)

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
], login)

// Refresh token
router.post('/refresh', refreshToken)

// Logout
router.post('/logout', protect, logout)

// Get current user
router.get('/me', protect, getMe)

module.exports = router
