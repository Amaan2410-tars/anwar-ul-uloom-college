const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')
const Payment = require('../models/Payment')
const { protect } = require('../middleware/auth')

// Initialize Razorpay (only if credentials are provided)
let razorpay = null
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })
}

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
  try {
    // Check if Razorpay is configured
    if (!razorpay) {
      return res.status(400).json({
        success: false,
        message: 'Payment gateway not configured. Please contact administrator.'
      })
    }

    const { amount, currency = 'INR', paymentType, description } = req.body

    // Create unique order ID
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create order in Razorpay
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: orderId,
      notes: {
        userId: req.user._id.toString(),
        paymentType,
        description
      }
    }

    const razorpayOrder = await razorpay.orders.create(options)

    // Save payment record
    const payment = await Payment.create({
      userId: req.user._id,
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      currency,
      paymentType,
      description,
      status: 'pending'
    })

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      paymentId: payment._id
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    })
  }
})

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    // Check if Razorpay is configured
    if (!razorpay) {
      return res.status(400).json({
        success: false,
        message: 'Payment gateway not configured. Please contact administrator.'
      })
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body

    // Verify signature
    const text = `${razorpayOrderId}|${razorpayPaymentId}`
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex')

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      })
    }

    // Update payment record
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'completed'
      },
      { new: true }
    )

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    })
  }
})

// @desc    Razorpay webhook
// @route   POST /api/payments/webhook
// @access  Public
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature']
    
    if (!signature) {
      return res.status(400).json({ success: false, message: 'No signature' })
    }

    // Verify webhook signature
    const crypto = require('crypto')
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    hmac.update(JSON.stringify(req.body))
    const generatedSignature = hmac.digest('hex')

    if (generatedSignature !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' })
    }

    const event = req.body.event
    const payload = req.body.payload

    // Handle payment.captured event
    if (event === 'payment.captured') {
      const paymentId = payload.payment.entity.id
      const orderId = payload.payment.entity.order_id

      // Update payment record
      await Payment.findOneAndUpdate(
        { razorpayOrderId: orderId },
        {
          razorpayPaymentId: paymentId,
          status: 'completed'
        }
      )
    }

    res.status(200).json({ success: true, message: 'Webhook processed' })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// @desc    Get user payments
// @route   GET /api/payments/my-payments
// @access  Private
router.get('/my-payments', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    })
  }
})

module.exports = router
