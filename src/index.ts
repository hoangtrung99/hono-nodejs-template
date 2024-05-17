import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import auth from 'routers/auth'

const app = new Hono()

// middlewares
app.use(logger())
app.use('/*', cors())

// register routes
app.route('/auth', auth)
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

// serve the app
const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
