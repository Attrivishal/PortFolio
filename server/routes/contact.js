const express = require('express')
const rateLimit = require('express-rate-limit')
const router = express.Router()
const Message = require('../models/Message')
const nodemailer = require('nodemailer')

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: Number(process.env.CONTACT_RATE_LIMIT || 5),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many contact requests, please try again later.' },
})

function requireAdmin(req, res, next) {
  const configuredKey = process.env.ADMIN_API_KEY
  const providedKey = req.get('x-admin-api-key')

  if (!configuredKey) {
    return res.status(503).json({ success: false, message: 'Admin API is not configured.' })
  }

  if (providedKey !== configuredKey) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' })
  }

  return next()
}

async function sendNotification(message) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) return

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New portfolio message: ${message.subject}`,
    text: [
      `Name: ${message.name}`,
      `Email: ${message.email}`,
      `Role: ${message.role}`,
      '',
      message.message,
    ].join('\n'),
  })
}

// ─── POST /api/contact ─────────────────────────────────
// Save a new message from the contact form
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, role } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      })
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'No subject',
      message: message.trim(),
      role: role || 'other',
      ipAddress: req.ip,
    })

    sendNotification(newMessage).catch(error => {
      console.error('Email notification failed:', error.message)
    })

    res.status(201).json({
      success: true,
      message: 'Message received! I\'ll get back to you soon.',
      data: {
        id: newMessage._id,
        name: newMessage.name,
        role: newMessage.role,
        createdAt: newMessage.createdAt,
      },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message)
      return res.status(400).json({ success: false, message: messages.join(', ') })
    }
    console.error('Contact route error:', error)
    res.status(500).json({ success: false, message: 'Server error. Please try again.' })
  }
})

// ─── GET /api/messages ─────────────────────────────────
router.get('/messages', requireAdmin, async (req, res) => {
  try {
    const { role, unread, limit = 50, page = 1 } = req.query
    const safeLimit = Math.min(Number(limit) || 50, 100)
    const safePage = Math.max(Number(page) || 1, 1)
    const filter = {}
    if (role) filter.role = role
    if (unread === 'true') filter.isRead = false

    const messages = await Message
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(safeLimit)
      .skip((safePage - 1) * safeLimit)
      .lean()

    const total = await Message.countDocuments(filter)

    res.json({
      success: true,
      data: messages,
      pagination: { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// ─── PATCH /api/contact/:id/read ──────────────────────
router.patch('/:id/read', requireAdmin, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' })
    res.json({ success: true, data: msg })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

module.exports = router
