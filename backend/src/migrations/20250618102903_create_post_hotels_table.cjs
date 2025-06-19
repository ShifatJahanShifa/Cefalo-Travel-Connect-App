exports.up = function(knex) {
  return knex.schema.createTable("post_hotels", (table)=>{
    table.increments("post_hotel_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.string("hotel_name").notNullable()
    table.string("hotel_location").notNullable()
    table.decimal("cost_per_night",null,2) 
    table.text("review").notNullable()
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_hotels")
};
