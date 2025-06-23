var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
export function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if admin already exists
        const existingAdmin = yield knex('users')
            .where({ role: 'admin' })
            .first();
        if (existingAdmin) {
            console.log('Admin already exists. Skipping seed.');
            return;
        }
        const hashedPassword = yield bcrypt.hash('admin1', 10);
        yield knex('users').insert({
            user_id: uuidv4(),
            username: 'admin1',
            email: 'admin1@cefalo.com',
            hashed_password: hashedPassword,
            phone_no: '+123456789',
            role: 'admin',
            bio: 'i am the first user of this system',
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log('Admin user seeded successfully!');
    });
}
