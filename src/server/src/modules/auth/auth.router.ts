import { Router } from 'express';
import passport from 'passport';
import { AuthController } from './auth.controller';
import { ModuleRouter } from '../../common/router/module-router.class';
import isAuthenticated from '../../common/middlewares/authentication.middleware';
import settings from "../../common/settings/settings";
import {User} from "../users/user";

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
     *     description: This method is intended for calling via the client
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
     * /auth/google/internal:
     *   get:
     *     summary: Internal Authenticate with Google
     *     description: This method is intended for calling from Swagger. For Google authentication to work, you will have to manually go to <a href="/auth/google/internal">/auth/google/internal</a> in url bar. If login will be successful, you will be redirected back to /docs page with Bearer Token in header. You can try successful login by executing /auth/profile request in Swagger UI.
     *     tags: [Auth]
     */
    this.router.get(
        '/google/internal',
        passport.authenticate('google-internal', {
          scope: ['email', 'profile'],
        })
    );


    /**
     * @swagger
     * /auth/google/callback:
     *   get:
     *     summary: Google authentication callback
     *     description: This method will be called by Google after authentication
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
     * /auth/google/callback/internal:
     *   get:
     *     summary: Internal Google authentication callback
     *     description: This method will be called by Google after internal authentication
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirect to success or failure route based on authentication result
     */
    this.router.get(
        '/google/callback/internal',
        passport.authenticate('google-internal', {
          failureRedirect: `/docs`,
        }), this.controller.googleCallbackInternal
    );

    /**
     * @swagger
     * /auth/session:
     *   get:
     *     summary: Check authentication status
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Display authentication status
     *       401:
     *         description: Authentication failed
     */
    this.router.get(
        '/session',
        passport.authenticate('jwt', ), this.controller.session
    )

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
