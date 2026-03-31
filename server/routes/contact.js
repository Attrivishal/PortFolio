const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

// ─── POST /api/contact ─────────────────────────────────
// Save a new message from the contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, role } = req.body

    // Basic validation
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

    console.log(`📩 New message from ${name} (${role || 'other'}) — ${email}`)

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
// Get all messages (add auth middleware in production)
router.get('/messages', async (req, res) => {
  try {
    const { role, unread, limit = 50, page = 1 } = req.query
    const filter = {}
    if (role) filter.role = role
    if (unread === 'true') filter.isRead = false

    const messages = await Message
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .lean()

    const total = await Message.countDocuments(filter)

    res.json({
      success: true,
      data: messages,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// ─── PATCH /api/contact/:id/read ──────────────────────
router.patch('/:id/read', async (req, res) => {
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
