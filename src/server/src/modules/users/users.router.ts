import { ModuleRouter } from '../../common/router/module-router.class';
import { Router } from 'express';
import { UsersController } from './users.controller';
import { UserService } from '../../services/user.service';
import isAuthenticated from '../../common/middlewares/authentication.middleware';

export class UsersRouter extends ModuleRouter {
  public readonly prefix = '/users';
  private readonly controller: UsersController;

  constructor(appRouter: Router) {
    super(appRouter);
    this.controller = new UsersController(new UserService());
  }

  getRoutes(): Router {
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get user information
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: email
     *         schema:
     *           type: string
     *         required: true
     *         description: User email
     *     responses:
     *       200:
     *         description: User data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: User not found
     */
    this.router.get(
      '/',
      isAuthenticated,
      this.controller.getUserByEmail.bind(this.controller)
    );

    /**
     * @swagger
     * /users:
     *   delete:
     *     summary: Delete user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: email
     *         schema:
     *           type: string
     *         required: true
     *         description: User email
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       404:
     *         description: User not found
     */
    this.router.delete(
      '/',
      isAuthenticated,
      this.controller.deleteUserByEmail.bind(this.controller)
    );

    return this.router;
  }
}
