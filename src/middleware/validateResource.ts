import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      })
      next()
    } catch (e: any) {
      return res.status(400).send(e.errors)
    }
  }

export default validateResource
