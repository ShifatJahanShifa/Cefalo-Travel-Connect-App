exports.up = function(knex) {
  return knex.schema.createTable('users', table => { 
    table.increments('user_id').primary()
    table.string('username', 50).unique().notNullable()
    table.string('email', 254).unique().notNullable()
    table.string('hashed_password',65).notNullable()
    table.enu('role', ['explorer', 'traveller', 'admin']).notNullable().defaultTo('explorer')
    table.string('profile_picture_url',255)
    table.text('bio')
    table.timestamps(true, true)
    })
};

exports.down = function(knex) {
   return knex.schema.dropTable('users')
};
