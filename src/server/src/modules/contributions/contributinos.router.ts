import { ModuleRouter } from '../../common/router/module-router.class';
import { Router } from 'express';
import { ContributionsController } from './contributions.controller';
import { ContributionsService } from '../../services/contributions.service';
import isAuthenticated from '../../common/middlewares/authentication.middleware';
import validate from '../../common/middlewares/validation.middleware';
import { idSchema } from '../../common/validators/common.validators';
import { createContributionSchema } from './create-contributions.schema';

export class ContributionsRouter extends ModuleRouter {
  public readonly prefix = '/contributions';
  private readonly controller: ContributionsController;

  constructor(appRouter: Router) {
    super(appRouter);
    this.controller = new ContributionsController(new ContributionsService());
  }

  getRoutes(): Router {
    /**
     * @swagger
     * /contributions:
     *   post:
     *     summary: Create a new contribution
     *     tags: [Contributions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *     responses:
     *       201:
     *         description: Contribution created successfully
     *       500:
     *         description: Internal Server Error
     */
    this.router.post(
      '/',
      isAuthenticated,
      validate(createContributionSchema),
      this.controller.createContribution.bind(this.controller)
    );

    /**
     * @swagger
     * /contributions:
     *   get:
     *     summary: Get all contributions
     *     tags: [Contributions]
     *     responses:
     *       200:
     *         description: A list of contributions
     *       500:
     *         description: Internal Server Error
     */
    this.router.get(
      '/',
      isAuthenticated,
      this.controller.getContributions.bind(this.controller)
    );

    /**
     * @swagger
     * /contributions/{id}:
     *   get:
     *     summary: Get a contribution by ID
     *     tags: [Contributions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Contribution ID
     *     responses:
     *       200:
     *         description: Contribution data
     *
     *       404:
     *         description: Contribution not found
     *       500:
     *         description: Internal Server Error
     */
    this.router.get(
      '/:id',
      isAuthenticated,
      validate(idSchema),
      this.controller.getContributionById.bind(this.controller)
    );

    /**
     * @swagger
     * /contributions/{id}:
     *   delete:
     *     summary: Delete a contribution by ID
     *     tags: [Contributions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Contribution ID
     *     responses:
     *       200:
     *         description: Contribution deleted successfully
     *       500:
     *         description: Internal Server Error
     */
    this.router.delete(
      '/:id',
      isAuthenticated,
      validate(idSchema),
      this.controller.deleteContribution.bind(this.controller)
    );

    return this.router;
  }
}
