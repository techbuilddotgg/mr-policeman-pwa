import { Router } from 'express';
import { AbstractModuleRouter } from './module-router.abstract';

export class ModuleRouter implements AbstractModuleRouter {
  public prefix: string;
  public readonly appRouter: Router;
  public readonly router: Router;
  public routers: ModuleRouter[];

  constructor(appRouter: Router, prefix?: string) {
    this.appRouter = appRouter;
    this.router = Router();
    this.routers = [];
    this.prefix = prefix ? prefix : '';
  }

  addRouter(router: ModuleRouter): void {
    this.routers.push(router);
  }

  getRoutes(): Router {
    if (!this.routers) return this.router;
    this.routers.forEach((router) => router.use());
    return this.router;
  }

  use(): Router {
    this.appRouter.use(this.prefix, this.getRoutes());
    return this.appRouter;
  }
}
