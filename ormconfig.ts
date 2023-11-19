import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'mysql',
  hort: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/database/migrations/*.ts'],
  cli: {
    entitiesDir: './src/modules/**/infra/typeorm/entities',
    migrationsDir: './src/shared/infra/typeorm/database/migrations',
  },
};