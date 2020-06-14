exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('favorite')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('favorite').insert([
                { beer_id: 1, user_id: 1 },
                { beer_id: 2, user_id: 1 },
                { beer_id: 3, user_id: 2 },
            ]);
        });
};