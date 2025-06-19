import  { Knex }  from 'knex';

export async function seed(knex: Knex) {
  await knex('post_categories').del();

  // Inserts seed entries
  await knex('post_categories').insert([
    { category_name: 'Adventure' },
    { category_name: 'Beach' },
    { category_name: 'Cultural Site' },
    { category_name: 'Food & Cuisine' },
    { category_name: 'Luxury' },
    { category_name: 'Budget Travel' },
    { category_name: 'Historical' },
    { category_name: 'Nature' },
    { category_name: 'Road Trip' },
    { category_name: 'Festival & Events' },
    { category_name: 'Heritage' }
  ]);
};
