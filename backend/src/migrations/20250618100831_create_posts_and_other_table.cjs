exports.up = function(knex) {

  return Promise.all([
    
    knex.schema.createTable('posts', table => { 
      table.increments('post_id').primary()
      table.integer('user_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE') 
      table.string('title', 255)
      table.text('description')
      table.decimal('total_cost', null, 2)
      table.string('duration')
      table.text('effort')
      table.enu('categories',['Adventure','Beach','Cultural Site','Budget Travel','Historical','Nature', 'Heritage'])
      table.integer('likes_count').defaultTo(0)
      table.integer('comments_count').defaultTo(0)
      table.timestamps(true, true)
      }),

      knex.schema.createTable("geo_locations", (table)=>{
        table.increments("geo_location_id").primary()
        table.decimal("latitude",10,6).notNullable()
        table.decimal("longitude",10,6).notNullable()
        table.string("location_name").notNullable()
      }),

      knex.schema.createTable('transports', table => {
        table.increments('transport_id').primary()
        table.string("transport_type").notNullable()
        table.string("transport_provider").notNullable()
        table.integer("starting_location_id").notNullable().references('geo_location_id').inTable('geo_locations').onDelete('CASCADE') 
        table.integer("ending_location_id").notNullable().references('geo_location_id').inTable('geo_locations').onDelete('CASCADE') 
        table.decimal("cost_per_person",null,2) 
      }),

      knex.schema.createTable('hotels', table => {
        table.increments('hotel_id').primary()
        table.string('hotel_name').notNullable()
        table.integer("geo_location_id").notNullable().references('geo_location_id').inTable('geo_locations').onDelete('CASCADE') 
        table.decimal("cost_per_night",null,2)
      }),

      knex.schema.createTable('places', table => {
        table.increments('place_id').primary()
        table.string('place_name').notNullable()
        table.integer("geo_location_id").notNullable().references('geo_location_id').inTable('geo_locations').onDelete('CASCADE') 
      }),
  ])
};

exports.down = function(knex) {
  return Promise.all([

    knex.schema.dropTableIfExists('places'),
    knex.schema.dropTableIfExists('hotels'),
    knex.schema.dropTableIfExists('transports'),
    knex.schema.dropTableIfExists('geo_locations'),
    knex.schema.dropTableIfExists('posts'),
  ]);
};
