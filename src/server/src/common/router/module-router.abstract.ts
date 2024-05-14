import { Router } from 'express';

export abstract class AbstractModuleRouter {
  abstract readonly prefix: string;

  abstract getRoutes(): Router;
}
