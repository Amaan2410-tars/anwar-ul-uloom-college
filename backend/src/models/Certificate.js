const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificateType: {
    type: String,
    enum: ['degree', 'bonafide', 'character', 'migration', 'other'],
    required: true
  },
  certificateNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  issuedDate: {
    type: Date,
    default: Date.now
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  pdfUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'issued', 'rejected'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Certificate', certificateSchema)
