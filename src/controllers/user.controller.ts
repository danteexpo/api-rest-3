import { Request, Response } from 'express'
import { createUser } from '../services/user.service'
import { CreateUserInput } from '../schemas/user.schema'
import { omit } from 'lodash'

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await createUser(req.body)
    return res.send(omit(user.toJSON(), 'password'))
  } catch (e: any) {
    console.error(e)
    return res.status(409).send(e.message)
  }
}
