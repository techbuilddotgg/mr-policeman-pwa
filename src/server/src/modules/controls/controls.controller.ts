import { ControlsService } from '../../services/controls.service';
import { NextFunction, Request, Response } from 'express';

export class ControlsController {
  constructor(private readonly controlsService: ControlsService) {}

  async createControl(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const control = await this.controlsService.createControl(data);
      return res.status(201).json({ message: 'Control created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getControls(req: Request, res: Response, next: NextFunction) {
    try {
      const controls = await this.controlsService.getControls();
      return res.status(200).json(controls);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getControlById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const control = await this.controlsService.getControlById(id);
      return res.status(200).json(control);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteControl(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.controlsService.deleteControl(id);
      return res.status(200).json({ message: 'Control deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
