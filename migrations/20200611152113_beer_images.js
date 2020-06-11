exports.up = function(knex) {
    return knex.schema.createTable('beers_image', function(table) {
        table.increments();
        table.integer('beer_id').unsigned().notNullable();
        table.foreign('beer_id').references('beers.id');
        table.string('img_path');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('beers_image');
};