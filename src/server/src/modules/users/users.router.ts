import { ModuleRouter } from '../../common/router/module-router.class';
import { Router } from 'express';
import { UsersController } from './users.controller';
import { UserService } from '../../services/user.service';
import isAuthenticated from '../../common/middlewares/authentication.middleware';
import passport from 'passport';

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

    /**
     * @swagger
     * /users/profile:
     *   get:
     *     summary: Get user profile information
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Return the authenticated user's profile information
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 user:
     *                   type: object
     *                   description: Authenticated user's profile information
     */
    this.router.get(
      '/profile',
      passport.authenticate('jwt'),
      this.controller.getProfile
    );

    /**
     * @swagger
     * /users:
     *   patch:
     *     summary: Update user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 example: password
     *             required:
     *               - username
     *               - password
     *     responses:
     *       200:
     *         description: User data
     */
    this.router.patch(
      '/',
      passport.authenticate('jwt'),
      this.controller.updateProfile
    );

    return this.router;
  }
}
