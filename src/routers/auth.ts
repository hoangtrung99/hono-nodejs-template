import { Hono } from 'hono'

import { jwt } from 'libs/middleware'
import { createJWT } from 'services/auth'

const auth = new Hono()

auth.post('/sign-jwt', async (c) => {
  const user = {
    id: 1,
    email: 'example@example.com',
    name: 'example'
  }
  const jwt = await createJWT(user)

  return c.json({ access_token: jwt, user })
})

auth.get('/me', jwt, async (c) => {
  const payload = c.get('jwtPayload')
  return c.json(payload)
})

export default auth
