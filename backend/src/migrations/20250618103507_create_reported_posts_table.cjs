exports.up = function(knex) {
  return knex.schema.createTable('reported_posts', (table) => {
    table.increments('report_id').primary();
    table.integer('post_id').notNullable();
    table.integer('user_id').notNullable();

    table.enu('reason', ['false_info', 'offensive', 'wrong_category', 'other']).notNullable();
    table.enu('status', ['pending', 'resolved']).notNullable().defaultTo('pending');
    table.text('note');
    table.timestamp(true, true)

    table.foreign('post_id')
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE');

    table.foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reported_posts');
};
