import { jwt as jwtMiddleware } from 'hono/jwt'

export const jwt = jwtMiddleware({
  secret: process.env.JWT_SECRET!
})
