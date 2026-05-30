const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 5001

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is required')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })

  console.log('MongoDB connected')

  const server = app.listen(PORT, () => {
    console.log(`Portfolio API running on port ${PORT}`)
  })

  const shutdown = async (signal) => {
    console.log(`${signal} received, shutting down gracefully`)
    server.close(async () => {
      await mongoose.connection.close()
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

start().catch((error) => {
  console.error('Server startup failed:', error.message)
  process.exit(1)
})
