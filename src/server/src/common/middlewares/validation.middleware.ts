import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';

const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      return res.status(400).json(e);
    }
  };
};

export default validate;
