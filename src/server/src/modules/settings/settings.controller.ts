import { SettingsService } from '../../services/settings.service';
import { NextFunction, Response, Request } from 'express';

export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  async getSettings(req: Request, res: Response, _next: NextFunction) {
    const { email } = req.user as { email: string };
    const settings =
      await this.settingsService.getNotificationSettingsByUser(email);

    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    return res.status(200).json(settings);
  }

  async updateNotificationSettings(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { enabled } = req.body;
    const { email } = req.user as { email: string };

    await this.settingsService.updateNotificationSettings(email, {
      enabled,
    });

    return res.status(200).json({ message: 'Settings updated' });
  }
}
