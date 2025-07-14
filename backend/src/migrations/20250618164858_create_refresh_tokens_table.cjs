exports.up = function(knex) {
  return knex.schema.createTable('refresh_tokens', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE');
    table.text('token').notNullable(); 
    table.timestamp('expires_at').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('refresh_tokens');
};
