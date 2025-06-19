exports.up = function(knex) {
  return knex.schema.createTable("post_transports", (table)=>{
    table.increments("post_transport_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.string("transport_type").notNullable()
    table.string("transport_provider").notNullable()
    table.decimal("cost_per_person",null,2) 
    table.text("review").notNullable()
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_transports")
};
