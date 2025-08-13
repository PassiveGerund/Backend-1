import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../config';
import logger from '../logger/pino.logger';

export const connectToPostgres = async () => {
  const connection = new Sequelize({
    dialect: 'postgres',
    host: appConfig.postgres.host,
    port: appConfig.postgres.port,
    username: appConfig.postgres.username,
    password: appConfig.postgres.password,
    database: appConfig.postgres.database,
    // host: 'localhost',
    // port: 5432,
    // username: 'postgres',
    // password: 'postgrespassword',
    // database: 'backend',
  });
  try {
    await connection.authenticate();
  } catch (error) {
    logger.error('Cannot connect to Postgres');
    logger.error(error);
    throw error;
  }
  logger.info('Successfully connected to PostgresSQL');
};
