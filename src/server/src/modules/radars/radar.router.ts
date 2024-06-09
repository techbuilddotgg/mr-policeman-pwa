import { ModuleRouter } from '../../common/router/module-router.class';
import { Router } from 'express';
import { RadarController } from './radar.controller';
import validate from '../../common/middlewares/validation.middleware';
import { idSchema } from '../../common/validators/common.validators';
import { RadarService } from '../../services/radar.service';

export class RadarRouter extends ModuleRouter {
  public readonly prefix = '/radars';
  private readonly controller: RadarController;

  constructor(appRouter: Router) {
    super(appRouter);
    this.controller = new RadarController(new RadarService());
  }

  /**
   * @swagger
   * tags:
   *   name: Radars
   *   description: Radar management API
   */

  getRoutes(): Router {
    /**
     * @swagger
     * /radars/{id}:
     *   get:
     *     summary: Get radar by ID
     *     tags: [Radars]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: The radar ID
     *     responses:
     *       200:
     *         description: Radar data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   format: uuid
     *                 latitude:
     *                   type: integer
     *                 longitude:
     *                   type: integer
     *                 speedLimit:
     *                   type: integer
     *       400:
     *         description: Invalid ID format
     *       404:
     *         description: Radar not found
     */
    this.router.get(
      '/:id',
      validate(idSchema),
      this.controller.getRadarById.bind(this.controller)
    );

    /**
     * @swagger
     * /radars:
     *   get:
     *     summary: Get list of all radars
     *     tags: [Radars]
     *     responses:
     *       200:
     *         description: A list of radars
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     format: uuid
     *                   latitude:
     *                     type: integer
     *                   longitude:
     *                     type: integer
     *                   speedLimit:
     *                     type: integer
     */
    this.router.get('/', this.controller.getRadars.bind(this.controller));

    /**
     * @swagger
     * /radars/download:
     *   post:
     *     summary: Download radars from external API
     *     tags: [Radars]
     *     responses:
     *       200:
     *         description: Radars downloaded
     */
    this.router.post(
      '/download',
      this.controller.downloadRadars.bind(this.controller)
    );

    return this.router;
  }
}
