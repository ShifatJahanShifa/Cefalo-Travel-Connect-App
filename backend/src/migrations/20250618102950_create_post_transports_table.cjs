exports.up = function(knex) {
  return knex.schema.createTable("post_transports", (table)=>{
    table.increments("post_transport_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.integer("transport_id").notNullable().references('transport_id').inTable('transports').onDelete('CASCADE') 
    table.decimal("cost",null,2).notNullable() 
    table.integer("rating").notNullable()
    table.text("review").notNullable()
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_transports")
};
