import { Router } from 'express';
import passport from 'passport';
import { AuthController } from './auth.controller';
import { ModuleRouter } from '../../common/router/module-router.class';
import isAuthenticated from '../../common/middlewares/authentication.middleware';
import settings from "../../common/settings/settings";
import {User} from "../users/types/user-type";

export class AuthRouter extends ModuleRouter {
  public readonly prefix = '/auth';
  private readonly controller: AuthController;

  constructor(appRouter: Router) {
    super(appRouter);
    this.controller = new AuthController();
  }

  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Authentication API
   */

  getRoutes(): Router {
    /**
     * @swagger
     * /auth/google:
     *   get:
     *     summary: Authenticate with Google
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirect to Google for authentication
     */
    this.router.get(
      '/google',
      passport.authenticate('google', {
        scope: ['email', 'profile'],
      })
    );

    /**
     * @swagger
     * /auth/google/callback:
     *   get:
     *     summary: Google authentication callback
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirect to success or failure route based on authentication result
     */
    this.router.get(
      '/google/callback',
      passport.authenticate('google', {
        failureRedirect: `${settings.clientUrl}/sign-in`,
      }), this.controller.googleCallback

    );

    /**
     * @swagger
     * /auth/failure:
     *   get:
     *     summary: Authentication failure route
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Display authentication failure message
     */
    this.router.get('/failure', this.controller.authFailure);

    /**
     * @swagger
     * /auth/profile:
     *   get:
     *     summary: Get user profile information
     *     tags: [Auth]
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
    this.router.get('/profile', passport.authenticate('jwt', {session: false}), this.controller.getProfile);

    this.router.post('/sign-in',passport.authenticate('local', {session: false} ), this.controller.login);

    this.router.post(
        '/sign-up',
        passport.authenticate('signup', { session: false }),
        this.controller.signup
    );


    return this.router;
  }
}
