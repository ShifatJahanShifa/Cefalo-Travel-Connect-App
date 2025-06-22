exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await knex.schema.createTable('wishlists', (table) => {
        table.uuid('wishlist_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

        table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE');

        table.text('title');
        
        table.enu('type', ['place', 'travel_plan']).notNullable();

        table.integer('reference_id').notNullable();

        table.string('theme');
        table.string('region');
        table.text('note');

        table.boolean('is_public').defaultTo(false);
    
        // table.decimal('alert_radius',10,6).nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('wishlists');
};
