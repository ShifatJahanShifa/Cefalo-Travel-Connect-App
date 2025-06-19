exports.up = function(knex) {
  return knex.schema.createTable('post_category_links', (table) => {
    table.integer('post_id').notNullable();
    table.integer('category_id').notNullable();

    table.primary(['post_id', 'category_id']);

    table.foreign('post_id').references('post_id').inTable('posts').onDelete('CASCADE');
    table.foreign('category_id').references('category_id').inTable('post_categories').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('post_category_links');
};
