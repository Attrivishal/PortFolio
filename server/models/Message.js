const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters'],
      default: 'No subject',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    role: {
      type: String,
      enum: ['mern', 'cloud', 'other'],
      default: 'other',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
MessageSchema.index({ createdAt: -1 })
MessageSchema.index({ role: 1 })
MessageSchema.index({ isRead: 1 })

module.exports = mongoose.model('Message', MessageSchema)
