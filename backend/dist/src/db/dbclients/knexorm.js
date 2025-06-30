import knex from 'knex';
import knexfile from '../config/knexfile.js';
export class KnexDatabaseClient {
    constructor() {
        this.knexDB = knex(knexfile.development);
    }
    async connect() {
        try {
            await this.knexDB.raw('SELECT 1');
            console.log('Connected to Knex database');
        }
        catch (err) {
            console.error('Failed to connect to Knex database:', err);
            throw err;
        }
    }
    async disconnect() {
        await this.knexDB.destroy();
        console.log('Knex connection closed');
    }
    getConnection() {
        return this.knexDB;
    }
}
