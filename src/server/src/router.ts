import { Router } from 'express';
import { AuthRouter } from './modules/auth/auth.router';
import { RadarRouter } from './modules/radars/radar.router';

const appRouter = (app: Router): void => {
  new AuthRouter(app).use();
  new RadarRouter(app).use();
};

export default { appRouter };
