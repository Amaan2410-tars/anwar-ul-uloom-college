const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayOrderId: {
    type: String,
    sparse: true
  },
  razorpayPaymentId: {
    type: String,
    sparse: true
  },
  razorpaySignature: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentType: {
    type: String,
    enum: ['admission', 'semester', 'hostel', 'library', 'other'],
    required: true
  },
  description: {
    type: String
  },
  receipt: {
    type: String
  },
  refundAmount: {
    type: Number,
    default: 0
  },
  refundReason: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
})

// Indexes
paymentSchema.index({ userId: 1, createdAt: -1 })
paymentSchema.index({ orderId: 1 })
paymentSchema.index({ razorpayPaymentId: 1 })

module.exports = mongoose.model('Payment', paymentSchema)
