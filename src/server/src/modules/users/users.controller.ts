import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user.service';

export class UsersController {
  constructor(private readonly userService: UserService) {}

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
}
