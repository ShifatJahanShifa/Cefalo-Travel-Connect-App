exports.up = function(knex) {
  return knex.schema.createTable("post_transports", (table) => {
    // Primary key as UUID
    table.uuid("post_transport_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    // Foreign key post_id as UUID
    table.uuid("post_id").notNullable()
      .references("post_id").inTable("posts")
      .onDelete("CASCADE");

    // Foreign key transport_id as UUID
    table.uuid("transport_id").notNullable()
      .references("transport_id").inTable("transports")
      .onDelete("CASCADE");

    table.decimal("cost", null, 2).notNullable();
    table.integer("rating").notNullable();
    table.text("review").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("post_transports");
};
