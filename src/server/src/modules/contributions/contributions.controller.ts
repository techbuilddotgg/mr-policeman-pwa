import { Request, Response, NextFunction } from 'express';
import { ContributionsService } from '../../services/contributions.service';

export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  async createContribution(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.contributionsService.createContribution(data);
      return res
        .status(201)
        .json({ message: 'Contribution created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getContributions(req: Request, res: Response, next: NextFunction) {
    try {
      const contributions = await this.contributionsService.getContributions();
      return res.status(200).json(contributions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getContributionById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const contribution =
        await this.contributionsService.getContributionById(id);
      return res.status(200).json(contribution);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteContribution(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.contributionsService.deleteContribution(id);
      return res
        .status(200)
        .json({ message: 'Contribution deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
