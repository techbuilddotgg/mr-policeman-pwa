import { Router } from 'express';
import { AuthRouter } from './modules/auth/auth.router';

const appRouter = (app: Router): void => {
  new AuthRouter(app).use();
};

export default { appRouter };
