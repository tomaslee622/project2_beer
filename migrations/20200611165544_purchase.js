exports.up = function(knex) {
    return knex.schema.createTable('purchase', function(table) {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.integer('beer_id').unsigned().notNullable();
        table.foreign('beer_id').references('beers.id');
        table.integer('bills').unsigned().defaultTo(0);
        table.foreign('bills').references('bills.id');
        table.integer('quantity').unsigned().notNullable();
        table.integer('price').unsigned().notNullable();
        table.boolean('bought').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('purchase');
};