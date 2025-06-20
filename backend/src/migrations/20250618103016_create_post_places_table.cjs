exports.up = function(knex) {
  return knex.schema.createTable("post_places", (table)=>{
    table.increments("post_place_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.integer("place_id").notNullable().references('place_id').inTable('places').onDelete('CASCADE') 
    table.integer("rating").notNullable()
    table.text("review").notNullable()
    
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_places")
};
