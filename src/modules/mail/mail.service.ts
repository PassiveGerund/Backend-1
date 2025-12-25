import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import { appConfig } from '../../config';

@injectable()
export class MailService {
  public readonly transport = nodemailer.createTransport({
    service: 'yandex',
    host: 'smtp.yandex.ru',
    port: 587,
    secure: false,
    auth: { user: appConfig.smtpUser, pass: appConfig.smtpPass },
  });
}
