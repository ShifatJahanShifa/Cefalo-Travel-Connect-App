exports.up = async function (knex) {
    return await knex.schema.createTable('travel_plan_comments', (table) => {
        table.uuid('comment_id').primary().defaultTo(knex.raw('uuid_generate_v4()')); 

        table.uuid('travel_plan_id').notNullable()
        .references('travel_plan_id')
        .inTable('travel_plans')
        .onDelete('CASCADE');

        table.uuid('sender_id').notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE');

        table.text('message').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex) {
    return await knex.schema.dropTableIfExists('travel_plan_messages');
};
