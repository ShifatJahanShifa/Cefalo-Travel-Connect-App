exports.up = function(knex) {
  return knex.schema.createTable('restaurants', (table) => {
      table.increments('restaurant_id').primary()
      table.string('restaurant_name').notNullable()
      table.string('popular_food')
      table.specificType('location', 'GEOGRAPHY(Point, 4326)').notNullable()
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('restaurants')
};
