exports.up = function(knex) {
  return knex.schema.createTable('restaurants', (table) => {
      table.uuid('restaurant_id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('restaurant_name').notNullable()
      table.specificType('location', 'GEOGRAPHY(Point, 4326)').notNullable()
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('restaurants')
};
