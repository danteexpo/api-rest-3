import 'dotenv/config'
import { Request, Response } from 'express'
import { validatePassword } from '../services/user.service'
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service'
import { signJwt } from '../utils/jwt'

export async function createSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body)

  if (!user) {
    return res.status(401).send('Invalid email or password')
  }

  // Create a session
  const session = await createSession(user._id, req.get('user-agent') || '')

  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  )

  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.REFRESH_TOKEN_TTL }
  )

  // Return access & refresh tokens
  return res.send({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(_req: Request, res: Response) {
  const userId = res.locals.user._id

  const sessions = await findSessions({ user: userId, valid: true })

  return res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session

  await updateSession({ _id: sessionId }, { valid: false })

  return res.send({
    accessToken: null,
    refreshToken: null,
  })
}
