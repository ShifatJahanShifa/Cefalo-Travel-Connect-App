exports.up = function (knex) {
  return knex.schema.createTable("post_accommodations", (table) => {
    table.increments("post_accommodation_id").primary();

    table
      .integer("post_id")
      .notNullable()
      .references("post_id")
      .inTable("posts")
      .onDelete("CASCADE");

    table
      .integer("accommodation_id")
      .notNullable()
      .references("accommodation_id")
      .inTable("accommodations")
      .onDelete("CASCADE");

    table.decimal("cost", null, 2).notNullable();
    table.integer("rating").notNullable();
    table.text("review").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("post_accommodations");
};
