import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('POSTGRE_HOST'),
  port: configService.getOrThrow('POSTGRE_PORT'),
  database: configService.getOrThrow('POSTGRE_DATABASE'),
  username: configService.getOrThrow('POSTGRE_USERNAME'),
  password: configService.getOrThrow('POSTGRE_PASSWORD'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: configService.getOrThrow('POSTGRE_SYNCHRONIZE'),
  logging: configService.getOrThrow('POSTGRE_LOGGING'),
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
