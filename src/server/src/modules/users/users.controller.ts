import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user.service';
import {UserResponseDto} from "./dto/user-response-dto";
import {User, UserUpdate} from "./user";

export class UsersController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.user as { email: string };
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.user as { email: string };
      await this.userService.deleteUser(email);

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getProfile(req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({ ...UserResponseDto.fromUser(req.user as User) });
  }

  async updateProfile(req: Request, res: Response) {
    const user = req.user as User;
    const newUserData = req.body as UserUpdate;

    try {
      // TODO: why is this.userService undefined?
      const updatedUser = await new UserService().updateUser(user.id, newUserData);
      return res.status(200).json({ ...UserResponseDto.fromUser(updatedUser) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
