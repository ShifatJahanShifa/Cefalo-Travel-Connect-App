exports.up = function(knex) {
  return knex.schema.createTable("post_foods", (table)=>{
    table.increments("post_food_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.string("food_name").notNullable()
    table.string("restaurant").notNullable()
    table.decimal("food_cost",null,2) 
    table.text("review").notNullable()
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_foods")
};
