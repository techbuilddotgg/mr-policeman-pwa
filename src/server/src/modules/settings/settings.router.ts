import { ModuleRouter } from '../../common/router/module-router.class';
import { Router } from 'express';
import { SettingsController } from './settings.controller';
import { SettingsService } from '../../services/settings.service';
import validate from '../../common/middlewares/validation.middleware';
import { updateNotificationSettingsSchema } from './update-settings.schema';
import isAuthenticated from '../../common/middlewares/authentication.middleware';

export class SettingsRouter extends ModuleRouter {
  public readonly prefix = '/settings';
  private readonly controller: SettingsController;

  constructor(appRouter: Router) {
    super(appRouter);
    this.controller = new SettingsController(new SettingsService());
  }

  getRoutes() {
    /**
     * @swagger
     * tags:
     *   name: Settings
     *   description: User settings management API
     */

    /**
     * @swagger
     * /settings:
     *   get:
     *     summary: Get user settings
     *     tags: [Settings]
     *     responses:
     *       200:
     *         description: User settings
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 enabled:
     *                   type: boolean
     *       404:
     *         description: Settings not found
     *       500:
     *         description: Internal Server Error
     */
    this.router.get(
      '/',
      isAuthenticated,
      this.controller.getSettings.bind(this.controller)
    );

    /**
     * @swagger
     * /settings:
     *   put:
     *     summary: Update user settings
     *     tags: [Settings]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               enabled:
     *                 type: boolean
     *             example:
     *               enabled: true
     *     responses:
     *       200:
     *         description: Settings updated
     *       400:
     *         description: Invalid input
     *       500:
     *         description: Internal Server Error
     */
    this.router.put(
      '/',
      isAuthenticated,
      validate(updateNotificationSettingsSchema),
      this.controller.updateNotificationSettings.bind(this.controller)
    );

    return this.router;
  }
}
