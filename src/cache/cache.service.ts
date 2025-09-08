import { injectable } from 'inversify';
import { createClient } from 'redis';
import { appConfig } from '../config';
import logger from '../logger/pino.logger';

@injectable()
export class CacheService {
  readonly redis = createClient({ url: appConfig.redisUrl });

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await this.connect();
      logger.info('Connected to Redis');
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
