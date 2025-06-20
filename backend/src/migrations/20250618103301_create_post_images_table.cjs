exports.up = function(knex) {
  return knex.schema.createTable("post_images", (table)=>{
    table.increments("post_image_id").primary()
    table.integer("post_id").notNullable().references('post_id').inTable('posts').onDelete('CASCADE') 
    table.string("image_url").notNullable()
    table.string("caption")
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable("post_images")
};