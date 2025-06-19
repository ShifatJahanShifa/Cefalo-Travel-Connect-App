exports.up = function(knex) {
  return knex.schema.createTable("post_places", (table)=>{
    table.increments("post_place_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.string("place_name").notNullable()
    table.string("place_location").notNullable()
    table.text("review").notNullable()
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_places")
};
