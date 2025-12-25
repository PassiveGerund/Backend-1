import { Request, Response, Router } from 'express';
import { injectable } from 'inversify';
import { MailService } from './mail.service';

@injectable()
export class MailController {
  public readonly router = Router();

  constructor(private readonly mailService: MailService) {
    this.router.post('/send-approval', (req, res) => this.sendApproval(req, res));
    this.router.post('/approve', (req, res) => this.approve(req, res));
  }

  async sendApproval(req: Request, res: Response) {
    const result = await this.mailService.sendApproval(req.body.email);
    res.json(result);
  }

  async approve(req: Request, res: Response) {
    const result = await this.mailService.approve(req.body.email, req.body.vcode);
    res.json(result);
  }
}
