// import type {Knex} from 'knex';
// import type { Knex } from 'knex'; // Named type import: interface for typing
import knex, { Knex } from 'knex'
import knexfile from '../config/knexfile.js';
// import knex from 'knex';
// export const db: Knex= Knex(knexfile.development);


import { IDatabaseClient } from '../dbclientsinterface.ts';

export class KnexDatabaseClient implements IDatabaseClient {
  private knexDB: Knex

  constructor() {
    this.knexDB = knex(knexfile.development);
  }

  async connect(): Promise<void> {
    try {
      await this.knexDB.raw('SELECT 1');
      console.log('Connected to Knex database');
    } catch (err) {
      console.error('Failed to connect to Knex database:', err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    await this.knexDB.destroy();
    console.log('Knex connection closed');
  }

  getConnection(): Knex {
    return this.knexDB;
  }
}
