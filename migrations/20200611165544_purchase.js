exports.up = function(knex) {
    return knex.schema.createTable('purchase', function(table) {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.integer('quantity').unsigned().notNullable();
        table.integer('price').unsigned();
        table.timestamp('purchased_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.boolean('bought').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('purchase');
};