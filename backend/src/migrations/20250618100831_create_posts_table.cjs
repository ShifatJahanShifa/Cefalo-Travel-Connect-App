exports.up = function(knex) {
  return knex.schema.createTable('posts', table => { 
    table.increments('post_id').primary()
    table.integer('user_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE') 
    table.string('title', 255)
    table.text('description')
    table.decimal('total_cost', null, 2)
    table.string('duration')
    table.text('effort')
    table.integer('likes_count').defaultTo(0)
    table.timestamps(true, true)
    })
};

exports.down = function(knex) {
   return knex.schema.dropTable('posts')
};
