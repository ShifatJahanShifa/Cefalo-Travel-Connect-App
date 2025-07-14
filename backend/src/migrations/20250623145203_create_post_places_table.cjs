exports.up = function(knex) {
  return knex.schema.createTable("post_places", (table) => {
    table.uuid("post_place_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.uuid("post_id").notNullable()
      .references("post_id").inTable("posts").onDelete("CASCADE");

    table.uuid("place_id").notNullable()
      .references("place_id").inTable("places").onDelete("CASCADE");
    table.decimal("cost", null, 2)
    table.integer("rating").notNullable();
    table.text("review").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("post_places");
};
