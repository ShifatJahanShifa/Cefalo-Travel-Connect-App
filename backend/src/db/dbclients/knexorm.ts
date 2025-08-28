import knex, { Knex } from 'knex';
import knexfile from '../config/knexfile.js';
import { IDatabaseClient } from '../dbclientsinterface.ts';
import logger from '../../utils/logger.ts';

export class KnexDatabaseClient implements IDatabaseClient {
  private knexDB: Knex;

  constructor() {
    this.knexDB = knex(knexfile.development);
  }

  async connect(): Promise<void> {
    try {
      await this.knexDB.raw('SELECT 1');
      logger.info('Connected to Knex database');
    } 
    catch (err) {
      logger.error('Failed to connect to Knex database:', err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    await this.knexDB.destroy();
    logger.info('Knex connection closed');
  }

  getConnection(): Knex {
    return this.knexDB;
  }
}
