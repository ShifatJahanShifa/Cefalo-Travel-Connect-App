exports.up = function(knex) {
  return knex.schema.createTable("post_restaurants", (table)=>{
    table.increments("post_restaurant_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.integer("restaurant_id").notNullable().references('restaurant_id').inTable('restaurants').onDelete('CASCADE') 
    table.decimal("cost",null,2).notNullable() 
    table.integer("rating").notNullable()
    table.text("review").notNullable()
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_restaurants")
};
