exports.up = async function(knex) {
  await knex.schema.createTable('posts_interactions', (table) => {
    table.increments('post_interaction_id').primary();
    
    table
      .integer('post_id')
      .notNullable()
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE');

    table
      .integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');

    table
      .enu('interaction_type', ['like', 'comment'])
      .notNullable();

    table.text('value').nullable(); 

    table.timestamps(true, true)

    table.unique(['post_id', 'user_id', 'interaction_type']);
  });
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('posts_interactions');
  await knex.raw('DROP TYPE IF EXISTS interaction_type_enum');
};
