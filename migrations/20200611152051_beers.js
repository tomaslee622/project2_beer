exports.up = function(knex) {
    return knex.schema.createTable('beers', function(table) {
        table.increments();
        table.unique('beer_name');
        table.string('beer_name').notNullable();
        table.string('info');
        table.integer('price');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('beers');
};