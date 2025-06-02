import dotenv from 'dotenv';
dotenv.config();
console.log(typeof process.env.DB_TYPE);
console.log(typeof process.env.DB_PASSWORD);
console.log(typeof process.env.DB_NAME);
console.log(typeof process.env.DB_USER);
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
            directory: '../migrations',
            tableName: 'knex_migrations'
        }
    }
};
export default config;
