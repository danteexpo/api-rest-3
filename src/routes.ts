import { Router } from 'express'
import { createUserHandler } from './controllers/user.controller'
import validateResource from './middleware/validateResource'
import { createUserSchema } from './schemas/user.schema'

const router = Router()

router.get('/healthcheck', (_req, res) => {
  res.sendStatus(200)
})

router.post('/api/users', validateResource(createUserSchema), createUserHandler)

export default router
