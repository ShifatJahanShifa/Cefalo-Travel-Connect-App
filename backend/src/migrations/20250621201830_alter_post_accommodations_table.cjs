exports.up = async function(knex) {

  await knex.schema.alterTable('post_accommodations', (table) => {
    table
      .integer('accommodation_id')
      .notNullable()
      .references('accommodation_id')
      .inTable('accommodations')
      .onDelete('CASCADE')
      .alter(); 
  });
};

exports.down = async function(knex) {
 
  await knex.schema.alterTable('post_accommodations', (table) => {
    table.dropForeign('accommodation_id');
  });

  await knex.schema.alterTable('post_accommodations', (table) => {
    table
      .foreign('accommodation_id')
      .references('hotel_id')
      .inTable('hotels')
      .onDelete('CASCADE');
  });
};
