import  { Knex }  from 'knex';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Check if admin already exists
  const existingAdmin = await knex('users')
    .where({ role: 'admin' })
    .first();

  if (existingAdmin) {
    console.log('Admin already exists. Skipping seed.');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin1', 10);

  await knex('users').insert({
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
}
