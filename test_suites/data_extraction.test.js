const knexConfig = require('../knexfile')['test'];
const knex = require('knex')(knexConfig);

describe('Extracting data from db', () => {
    test('Extracting users table', (done) => {
        const getUsers = async(done) => {
            try {
                let users = await knex('users').select('*');
                expect(users.length).toBe(4);
                done();
            } catch {}
        };
        getUsers(done);
    });
    test('Extracting beers table', (done) => {
        const getBeers = async(done) => {
            try {
                let beers = await knex('beers').select('*');
                expect(beers.length).toBe(4);
                done();
            } catch {}
        };
        getBeers(done);
    });
});