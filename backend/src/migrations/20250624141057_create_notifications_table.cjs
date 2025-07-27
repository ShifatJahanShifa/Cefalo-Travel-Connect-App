exports.up = async function(knex) {
  await knex.schema.createTable('notifications', (table) => {
    table.uuid('notification_id').primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.uuid('user_id').notNullable()
      .references('user_id').inTable('users')
      .onDelete('CASCADE');

    table.enu('type', [
      'travel_plan_invitation',
      'post_comment',
      'like',
      'plan_comment'
    ]).notNullable();

    table.uuid('reference_id'); 
    table.boolean('read').notNullable().defaultTo(false);

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('notifications');
};
