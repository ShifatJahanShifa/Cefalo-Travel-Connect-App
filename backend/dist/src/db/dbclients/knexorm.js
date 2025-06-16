var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import knex from 'knex';
import knexfile from '../config/knexfile.js';
export class KnexDatabaseClient {
    constructor() {
        this.knexDB = knex(knexfile.development);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.knexDB.raw('SELECT 1');
                console.log('Connected to Knex database');
            }
            catch (err) {
                console.error('Failed to connect to Knex database:', err);
                throw err;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knexDB.destroy();
            console.log('Knex connection closed');
        });
    }
    getConnection() {
        return this.knexDB;
    }
}
