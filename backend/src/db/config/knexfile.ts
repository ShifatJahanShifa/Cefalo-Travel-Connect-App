import dotenv from 'dotenv';
import type { Knex }    from 'knex';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../../../.env') });

// for checking
// console.log(typeof process.env.DB_TYPE);
// console.log(typeof process.env.DB_PASSWORD);
// console.log(typeof process.env.DB_NAME);
// console.log(typeof process.env.DB_USER);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_TYPE,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'cjs',
      directory: '../../migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: '../../seeds'
    }
  }
};

export default config;
