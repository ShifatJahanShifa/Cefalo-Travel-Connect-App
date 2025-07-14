exports.up = function(knex) {
  return knex.schema.alterTable('posts', table => {
    table.dropColumn('categories');
  }).then(() => {
    return knex.schema.alterTable('posts', table => {
      table.specificType('categories', 'TEXT[]');  
    });
  });
}

exports.down = function(knex) {
  return knex.schema.alterTable('posts', table => {
    table.dropColumn('categories');
  }).then(() => {
    return knex.schema.alterTable('posts', table => {
      table.enu('categories', [
        'Adventure','Beach','Cultural Site','Budget Travel','Historical','Nature', 'Heritage'
      ]);
    });
  });
}
