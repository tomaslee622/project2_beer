exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('email').unique().notNullable();
        table.string('password');
        table.string('first_name');
        table.string('last_name');
        table.string('phone');
        table.date('birthday');
        table.string('propic_path');
        table.string('google_id');
        table.string('facebook_id');
        table.boolean('noti');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};