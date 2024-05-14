import { NextFunction, Request, Response } from 'express';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user
    ? next()
    : res.status(401).json({ message: 'Authentication failed' });
};

export default isAuthenticated;
