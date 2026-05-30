const test = require('node:test')
const assert = require('node:assert/strict')
const app = require('../app')

function startTestServer() {
  return new Promise(resolve => {
    const server = app.listen(0, () => {
      resolve({
        server,
        baseUrl: `http://127.0.0.1:${server.address().port}`,
      })
    })
  })
}

test('health endpoint reports degraded when database is not connected', async () => {
  const { server, baseUrl } = await startTestServer()

  try {
    const response = await fetch(`${baseUrl}/api/health`)
    const body = await response.json()

    assert.equal(response.status, 503)
    assert.equal(body.status, 'degraded')
    assert.equal(body.database, 'disconnected')
  } finally {
    server.close()
  }
})

test('message listing is not public', async () => {
  const { server, baseUrl } = await startTestServer()

  try {
    const response = await fetch(`${baseUrl}/api/contact/messages`)
    const body = await response.json()

    assert.equal(response.status, 503)
    assert.equal(body.success, false)
  } finally {
    server.close()
  }
})
