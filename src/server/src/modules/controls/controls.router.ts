import { ControlsController } from './controls.controller';
import { Router } from 'express';
import { ControlsService } from '../../services/controls.service';
import { ModuleRouter } from '../../common/router/module-router.class';
import validate from '../../common/middlewares/validation.middleware';
import { createControlSchema } from './create-control.schema';
import { idSchema } from '../../common/validators/common.validators';
import passport from 'passport';

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
     *                 type: number
     *                 description: The latitude of the control
     *               longitude:
     *                 type: number
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
      // passport.authenticate('jwt'),
      validate(createControlSchema),
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
      //passport.authenticate('jwt'),
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
      // passport.authenticate('jwt'),
      validate(idSchema),
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
      //  passport.authenticate('jwt'),
      validate(idSchema),
      this.controller.deleteControl.bind(this.controller)
    );

    /**
     * @swagger
     * /controls/{id}/upvote:
     *   put:
     *     summary: Upvote a control
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
     *         description: Control upvoted successfully
     *       500:
     *         description: Internal Server Error
     */
    this.router.put(
      '/:id/upvote',
      //   passport.authenticate('jwt'),
      validate(idSchema),
      this.controller.upVoteControl.bind(this.controller)
    );

    /**
     * @swagger
     * /controls/{id}/downvote:
     *   put:
     *     summary: Downvote a control
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
     *         description: Control downvoted successfully
     *       500:
     *         description: Internal Server Error
     */

    this.router.put(
      '/:id/downvote',
      //  passport.authenticate('jwt'),
      validate(idSchema),
      this.controller.downVoteControl.bind(this.controller)
    );

    return this.router;
  }
}
