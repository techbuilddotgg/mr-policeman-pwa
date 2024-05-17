import { NextFunction, Request, Response } from 'express';
import {UserResponseDto} from "../users/dto/user-response.dto";
import {User} from "../users/types/user-type";
import jwt from "jsonwebtoken";
import settings from "../../common/settings/settings";

export class AuthController {
  constructor() {}

  public async authFailure(_req: Request, res: Response, _next: NextFunction) {
    res.status(401).json({ message: 'Authentication failed' });
  }

  public async getProfile(req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({ user: UserResponseDto.fromUser(req.user as User) });
  }

  public async login(req: Request, res: Response, _next: NextFunction) {
    if(!req.user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = AuthController.createToken(req.user as User);

    return res.json({ accessToken: token });
  }

  public async signup(req: Request, res: Response, _next: NextFunction) {
    if(!req.user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = AuthController.createToken(req.user as User);

    return res.json({ accessToken: token });
  }

  private static createToken(user: User) {
    const tokenBody = UserResponseDto.fromUser(user);
    return jwt.sign({user: tokenBody}, settings.jwtSecret, {
      expiresIn: '1h',
    });
  }
}
