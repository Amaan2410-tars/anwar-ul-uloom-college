const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')
const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController')

// Public routes
router.get('/', getDepartments)
router.get('/:id', getDepartment)

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createDepartment)
router.put('/:id', protect, authorize('admin'), updateDepartment)
router.delete('/:id', protect, authorize('admin'), deleteDepartment)

module.exports = router
