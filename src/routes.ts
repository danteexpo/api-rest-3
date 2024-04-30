import { Router } from 'express'
import { createUserHandler } from './controllers/user.controller'
import validateResource from './middleware/validateResource'
import { createUserSchema } from './schemas/user.schema'
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './controllers/session.controller'
import { createSessionSchema } from './schemas/session.schema'
import requireUser from './middleware/requireUser'

const router = Router()

router.get('/healthcheck', (_req, res) => {
  res.sendStatus(200)
})

router.post('/api/users', validateResource(createUserSchema), createUserHandler)

router.post(
  '/api/sessions',
  validateResource(createSessionSchema),
  createSessionHandler
)

router.get('/api/sessions', requireUser, getUserSessionsHandler)

router.delete('/api/sessions', requireUser, deleteSessionHandler)

export default router
