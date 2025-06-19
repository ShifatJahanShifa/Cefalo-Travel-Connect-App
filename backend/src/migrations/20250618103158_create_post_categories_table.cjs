exports.up = function(knex) {
  return knex.schema.createTable("post_categories", (table) => {
    table.increments("category_id").primary()
    table.string("category_name").notNullable()
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_categories")
};
