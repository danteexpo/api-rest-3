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
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schemas/product.schema'
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from './controllers/product.controller'

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

router.post(
  '/api/products',
  [requireUser, validateResource(createProductSchema)],
  createProductHandler
)

router.put(
  '/api/products/:productId',
  [requireUser, validateResource(updateProductSchema)],
  updateProductHandler
)

router.get(
  '/api/products/:productId',
  validateResource(getProductSchema),
  getProductHandler
)

router.delete(
  '/api/products/:productId',
  [requireUser, validateResource(deleteProductSchema)],
  deleteProductHandler
)

export default router
