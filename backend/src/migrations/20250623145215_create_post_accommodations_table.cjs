exports.up = function(knex) {
  return knex.schema.createTable("post_accommodations", (table) => {
    // Primary key as UUID
    table.uuid("post_accommodation_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    // Foreign key post_id as UUID
    table.uuid("post_id").notNullable()
      .references("post_id").inTable("posts")
      .onDelete("CASCADE");

    // Foreign key accommodation_id as UUID
    table.uuid("accommodation_id").notNullable()
      .references("accommodation_id").inTable("accommodations")
      .onDelete("CASCADE");

    table.decimal("cost", null, 2).notNullable();
    table.integer("rating").notNullable();
    table.text("review").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("post_accommodations");
};
