require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const contactRoutes = require('./routes/contact')

const app = express()

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(helmet())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.API_RATE_LIMIT || 100),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
})
app.use('/api/', limiter)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use('/api/contact', contactRoutes)

app.get('/api/health', (req, res) => {
  const databaseStates = ['disconnected', 'connected', 'connecting', 'disconnecting']
  const databaseState = databaseStates[mongoose.connection.readyState] || 'unknown'
  const healthy = databaseState === 'connected'

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    service: 'portfolio-api',
    environment: process.env.NODE_ENV || 'development',
    database: databaseState,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  })
})

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const isProduction = process.env.NODE_ENV === 'production'

  console.error(JSON.stringify({
    level: 'error',
    message: err.message,
    path: req.originalUrl,
    method: req.method,
    status,
  }))

  res.status(status).json({
    success: false,
    message: status === 500 && isProduction ? 'Internal server error' : err.message,
  })
})

module.exports = app
