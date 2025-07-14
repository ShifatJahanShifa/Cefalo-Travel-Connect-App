exports.up = async function (knex) {
  await knex.schema.createTable('travel_plan_members', (table) => {
    table.uuid('travel_plan_id').notNullable()
      .references('travel_plan_id').inTable('travel_plans')
      .onDelete('CASCADE');

    table.uuid('user_id').notNullable()
      .references('user_id').inTable('users')
      .onDelete('CASCADE');

    table.enu('role', ['creator', 'editor', 'member']).notNullable();

    table.primary(['travel_plan_id', 'user_id']); // composite PK
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('travel_plan_members');
};
