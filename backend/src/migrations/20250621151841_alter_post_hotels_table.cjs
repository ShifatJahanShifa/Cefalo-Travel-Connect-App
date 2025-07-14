exports.up = async function(knex) {
  await knex.schema.renameTable('post_hotels', 'post_accommodations');

  await knex.schema.alterTable('post_accommodations', (table) => {
    table.renameColumn('post_hotel_id', 'post_accommodation_id');
    table.renameColumn('hotel_id', 'accommodation_id');
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable('post_accommodations', (table) => {
    table.renameColumn('post_accommodation_id', 'post_hotel_id');
    table.renameColumn('accommodation_id', 'hotel_id');
  });

  await knex.schema.renameTable('post_accommodations', 'post_hotels');
};
