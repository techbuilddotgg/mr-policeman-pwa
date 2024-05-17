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
     *     description: IMPORTANT! For Google authentication to work, you will have to manually go to /auth/google in url bar. If login will be successful, you will be redirected back to /docs page with Bearer Token in header.
     *     tags: [Auth]
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

    /**
     * @swagger
     * /auth/sign-in:
     *   post:
     *     summary: User sign-in
     *     description: Authenticates a user using username and password
     *     tags: [Auth]
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
     *         description: Successful authentication
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *                   description: JWT access token
     *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
     *       401:
     *         description: Authentication failed
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Authentication failed
     */
    this.router.post('/sign-in',passport.authenticate('local', {session: false} ), this.controller.login);

    /**
     * @swagger
     * /auth/sign-up:
     *   post:
     *     summary: User sign-up
     *     description: Registers a new user with username and password
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 example: newuser@example.com
     *               password:
     *                 type: string
     *                 example: password
     *             required:
     *               - username
     *               - password
     *     responses:
     *       200:
     *         description: Successful registration
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *                   description: JWT access token
     *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
     *       401:
     *         description: Registration failed
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Registration failed
     */
    this.router.post(
        '/sign-up',
        passport.authenticate('signup', { session: false }),
        this.controller.signup
    );


    return this.router;
  }
}
