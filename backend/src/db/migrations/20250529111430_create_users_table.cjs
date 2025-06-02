/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => { 
    table.uuid('id').primary()
    table.string('username').unique()
    table.string('email').unique()
    table.string('password')
    table.string('role')
    table.timestamps(true, true)
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
