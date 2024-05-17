import * as jose from 'jose'
import type { JWTPayload } from 'types/auth'

export const createJWT = async (
  payload: JWTPayload,
  expireTime: string | number | Date = '30days'
) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expireTime)
    .sign(secret)

  return jwt
}

export const verifyJWT = async (jwt: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
  const { payload } = await jose.jwtDecrypt(jwt, secret)
  return payload
}
