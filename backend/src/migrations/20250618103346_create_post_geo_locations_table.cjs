exports.up = function(knex) {
  return knex.schema.createTable("post_geo_locations", (table)=>{
    table.increments("post_geo_location_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.decimal("latitude",10,6).notNullable()
    table.decimal("longitude",10,6).notNullable()
    table.string("location_name").notNullable()
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_geo_locations")
};