import { faker } from '@faker-js/faker/locale/ar';
import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import { appConfig } from '../../config';
import { UserEntity } from '../../database/entities';
import { BadRequestException } from '../../exceptions';
import logger from '../../logger/pino.logger';

@injectable()
export class MailService {
  public readonly transport = nodemailer.createTransport({
    service: 'yandex',
    host: 'smtp.yandex.ru',
    port: 587,
    secure: false,
    auth: { user: appConfig.smtpUser, pass: appConfig.smtpPass },
  });

  // Отправка кода подтверждения
  async sendApproval(dtoemail: string) {
    logger.info(`Подтверждение почты ${dtoemail}`);

    // записываем vcode юзеру
    // есть ли такой пользователь по email
    const exist = await UserEntity.findOne({
      where: { email: dtoemail },
    });
    if (exist === null) {
      throw new BadRequestException(`Нет такого email ${dtoemail} `);
    }

    if (exist.approved) {
      throw new BadRequestException(`Ваша почта уже подтверждена`);
    }

    const randomcode = faker.number.int({ min: 100000, max: 999999 });
    await UserEntity.update({ vcode: randomcode }, { where: { email: dtoemail } });

    logger.info(`Записали код ${randomcode}`);

    // отправляем пользователю на почту
    await this.transport.sendMail({
      from: appConfig.smtpUser + '@yandex.ru',
      to: dtoemail,
      subject: `Ваш код подтверждения  ${randomcode}`,
      html: `Ваш код подтверждения  ${randomcode}`,
    });
    return { exist };
  }

  // Подрвеждение почты
  async approve(dtoemail: string, dtovcode: string) {
    logger.info(`Пользователь прислал код ${dtovcode}`);

    const exist = await UserEntity.findOne({
      where: { email: dtoemail },
    });
    if (exist === null) {
      throw new BadRequestException(`Нет такого email ${dtoemail} `);
    }
    if (exist.vcode !== dtovcode) {
      logger.info(`Пользователь прислал код ${dtovcode} и он НЕ совпадает с ${exist.vcode}`);
      throw new BadRequestException(`Пользователь прислал код ${dtovcode} и он НЕ совпадает с ${exist.vcode}`);
    }
    logger.info(`Пользователь прислал код ${dtovcode} и он совпадает с ${exist.vcode}`);
    await UserEntity.update({ approved: true }, { where: { email: dtoemail } });

    return { exist }; // тут он мне старые данные шлет, как получить актуальные?
  }
}
