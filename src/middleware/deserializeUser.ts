import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  if (!accessToken) {
    return next()
  }

  const { decoded } = verifyJwt(accessToken)

  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  return next()
}

export default deserializeUser
