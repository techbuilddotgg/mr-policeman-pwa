import { NextFunction, Request, Response } from 'express';

export class AuthController {
  constructor() {}

  public async authFailure(_req: Request, res: Response, _next: NextFunction) {
    res.status(401).json({ message: 'Authentication failed' });
  }

  public async getSession(req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({ user: req.user });
  }
}
