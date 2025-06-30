import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
import { resolve } from 'path';
// const __filename_file = fileURLToPath(import.meta.url);
// const __dirname_dir = dirname(__filename_file); 
// import { __filename_file, __dirname_dir } from '../../utils/esm-path.js' 
const __dirname_dir = "C:\\Users\\cefalo\\Desktop\\Cefalo-Travel-Connect-App\\backend\\src\\db\\config";
dotenv.config({ path: resolve(__dirname_dir, '../../../.env') });
// for checking
// console.log(typeof process.env.DB_TYPE);
// console.log(typeof process.env.DB_PASSWORD);
// console.log(typeof process.env.DB_NAME);
// console.log(typeof process.env.DB_USER);
const config = {
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
