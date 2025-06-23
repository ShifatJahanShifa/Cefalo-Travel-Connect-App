exports.up = function(knex) {
  return knex.schema.createTable("post_foods", (table) => {
    // Primary key as UUID
    table.uuid("post_food_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    // Foreign key post_id as UUID
    table.uuid("post_id").notNullable()
      .references('post_id').inTable('posts')
      .onDelete('CASCADE');

    table.string("food_name").notNullable();
    table.decimal("cost", null, 2);
    table.integer("rating").notNullable();
    table.text("review").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("post_foods");
};
