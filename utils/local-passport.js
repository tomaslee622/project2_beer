//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knexConfig = require('../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (app) => {
    passport.use(
        'local-login',
        new LocalStrategy(async(email, password, done) => {
            try {
                let users = await knex('users').where({ email: email });
                if (users.length == 0) {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
                let user = users[0];
                if (user.password === password) {
                    console.log('successful login');
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        // let users = await knex('users').where({ id: id });
        // if (users.length == 0) {
        //     return done(new Error(`Wrong user id ${id}`));
        // }
        // let user = users[0];
        return done(null, id);
    });
};