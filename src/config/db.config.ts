import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    url: process.env.url,
    type: 'postgres',
    ssl: { rejectUnauthorized: false },
    port: +process.env.port! || 3000,
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],

    synchronize: true,
  }),
);