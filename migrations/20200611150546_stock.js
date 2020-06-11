exports.up = function(knex) {
    return knex.schema.createTable('stock', function(table) {
        table.increments();
        table.string('brand').notNullable();
        table.integer('stock').unsigned().notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('stock');
};