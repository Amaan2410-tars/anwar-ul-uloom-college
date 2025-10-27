const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    uppercase: true
  },
  description: {
    type: String
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  eligibility: {
    type: String
  },
  fees: {
    semester: {
      type: Number,
      default: 0
    },
    annual: {
      type: Number,
      default: 0
    }
  },
  intake: {
    type: Number,
    default: 60
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Course', courseSchema)
