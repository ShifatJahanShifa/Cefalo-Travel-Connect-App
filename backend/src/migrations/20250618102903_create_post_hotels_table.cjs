exports.up = function(knex) {
  return knex.schema.createTable("post_hotels", (table)=>{
    table.increments("post_hotel_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.integer("hotel_id").notNullable().references('hotel_id').inTable('hotels').onDelete('CASCADE') 
    table.decimal("cost",null,2).notNullable() 
    table.integer("rating").notNullable()
    table.text("review").notNullable()
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_hotels")
};
