import { injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { appConfig } from '../../config';
import { UserEntity } from '../../database/entities';

@injectable()
export class TelegramService {
  public readonly bot = new Telegraf(appConfig.tg);
  constructor() {
    this.bot.start(async (ctx) => {
      const user = await UserEntity.findAll();
      let message = '';
      user.forEach((user) => {
        message += `${user.id} ${user.name} \n`;
      });
      return ctx.reply(`Hello ${message} !`);
    });
    this.bot.command('test', async (ctx) => {
      return ctx.reply('Test !');
    });
    this.bot.launch();
  }
}
