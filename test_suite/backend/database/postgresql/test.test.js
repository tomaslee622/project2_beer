const knexConfig = require('../../../../knexfile')['development'];
const knex = require('knex')(knexConfig);

test('', () => {
    expect(sum(1, 2)).toBe(3);
});