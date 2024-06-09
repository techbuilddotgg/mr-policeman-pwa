import { RadarService } from '../../services/radar.service';
import { NextFunction, Request, Response } from 'express';

export class RadarController {
  constructor(private readonly radarService: RadarService) {}

  async getRadarById(req: Request, res: Response, _next: NextFunction) {
    const radar = await this.radarService.getRadarById(req.params.id);

    if (!radar) {
      return res.status(404).json({ message: 'Radar not found' });
    }

    return res.status(200).json(radar);
  }

  async getRadars(_req: Request, res: Response, _next: NextFunction) {
    const list = await this.radarService.getRadars();
    res.status(200).json(list);
  }

  async downloadRadars(_req: Request, res: Response, _next: NextFunction) {
    await this.radarService.downloadRadars();
    res.status(200).json({ message: 'Radars downloaded' });
  }
}
