import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../config';
import logger from '../logger/pino.logger';
import { DepartmentEntity, TaskEntity, UserEntity } from './entities';

export const connectToPostgres = async () => {
  const connection = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: appConfig.postgres.host,
    port: appConfig.postgres.port,
    username: appConfig.postgres.username,
    password: appConfig.postgres.password,
    database: appConfig.postgres.database,
  });

  connection.addModels([UserEntity, TaskEntity, DepartmentEntity]);

  try {
    await connection.authenticate();
  } catch (error) {
    logger.error('Cannot connect to Postgres');
    logger.error(error);
    throw error;
  }
  // force: true для пересоздания БД, если вносили изменения в структуру таблицы
  await connection.sync({ alter: true });
  logger.info('Successfully connected to PostgresSQL');
};
