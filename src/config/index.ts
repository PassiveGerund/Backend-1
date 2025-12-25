import { config as readEnv } from 'dotenv';
import * as process from 'node:process';
import { validate } from '../validate';
import { AppConfigDto } from './dto';

readEnv();

const rawConfig = {
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  secret: process.env.SECRET,
  tg: process.env.TG,
  smtpUser: process.env.smtpUser,
  smtpPass: process.env.smtpPass,

  postgres: {
    host: process.env.POSTGRESSQL_HOST,
    port: process.env.POSTGRESSQL_PORT,
    username: process.env.POSTGRESSQL_USERNAME,
    password: process.env.POSTGRESSQL_PASSWORD,
    database: process.env.POSTGRESSQL_DATABASE,
  },
};

export const appConfig = validate(AppConfigDto, rawConfig);
