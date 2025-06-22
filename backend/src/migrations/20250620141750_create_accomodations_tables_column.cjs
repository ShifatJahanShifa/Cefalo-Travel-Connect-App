exports.up = function(knex) {
  return knex.schema.createTable('accommodations', (table) => {
      table.increments('accommodation_id').primary()
      table.enu('accommodation_type',['hotel', 'motel', 'resort', 'villa', 'cottage']).notNullable()
      table.string('accommodation_name').notNullable()
      table.specificType('location', 'GEOGRAPHY(Point, 4326)').notNullable()
      table.decimal("cost_per_night",null,2)
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('accommodations')
};
