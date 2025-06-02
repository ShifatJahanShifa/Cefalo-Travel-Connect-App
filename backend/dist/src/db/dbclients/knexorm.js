import Knex from 'knex';
// import type { Knex } from 'knex'; // Named type import: interface for typing
import knexfile from '../config/knexfile.js';
export const db = Knex(knexfile.development);
