import { ControlsController } from './controls.controller';
import { Router } from 'express';
import { ControlsService } from '../../services/controls.service';
import { ModuleRouter } from '../../common/router/module-router.class';
import isAuthenticated from '../../common/middlewares/authentication.middleware';

export class ControlsRouter extends ModuleRouter {
  public readonly prefix = '/controls';
  private readonly controller: ControlsController;

  constructor(appRouter: Router) {
    super(appRouter);
    this.controller = new ControlsController(new ControlsService());
  }

  getRoutes(): Router {
    /**
     * @swagger
     * /controls:
     *   post:
     *     summary: Create a new control
     *     tags: [Controls]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the control
     *               latitude:
     *                 type: string
     *                 description: The latitude of the control
     *               longitude:
     *                 type: string
     *                 description: The longitude of the control
     *               description:
     *                 type: string
     *                 description: The description of the control
     *             required:
     *               - name
     *               - latitude
     *               - longitude
     *               - description
     *     responses:
     *       201:
     *         description: Control created successfully
     *       500:
     *         description: Internal Server Error
     */
    this.router.post(
      '/',
      isAuthenticated,
      this.controller.createControl.bind(this.controller)
    );

    /**
     * @swagger
     * /controls:
     *   get:
     *     summary: Get all controls
     *     tags: [Controls]
     *     responses:
     *       200:
     *         description: A list of controls
     *       500:
     *         description: Internal Server Error
     */
    this.router.get(
      '/',
      isAuthenticated,
      this.controller.getControls.bind(this.controller)
    );

    /**
     * @swagger
     * /controls/{id}:
     *   get:
     *     summary: Get a control by ID
     *     tags: [Controls]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Control ID
     *     responses:
     *       200:
     *         description: Control data
     *
     *       404:
     *         description: Control not found
     *       500:
     *         description: Internal Server Error
     */
    this.router.get(
      '/:id',
      isAuthenticated,
      this.controller.getControlById.bind(this.controller)
    );

    /**
     * @swagger
     * /controls/{id}:
     *   delete:
     *     summary: Delete a control by ID
     *     tags: [Controls]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Control ID
     *     responses:
     *       200:
     *         description: Control deleted successfully
     *       500:
     *         description: Internal Server Error
     */
    this.router.delete(
      '/:id',
      isAuthenticated,
      this.controller.deleteControl.bind(this.controller)
    );

    return this.router;
  }
}
