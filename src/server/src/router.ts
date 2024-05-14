import { Router } from 'express';
import { AuthRouter } from './modules/auth/auth.router';
import { RadarRouter } from './modules/radars/radar.router';
import { SettingsRouter } from './modules/settings/settings.router';
import { UsersRouter } from './modules/users/users.router';

const appRouter = (app: Router): void => {
  new AuthRouter(app).use();
  new RadarRouter(app).use();
  new SettingsRouter(app).use();
  new UsersRouter(app).use();
};

export default { appRouter };
