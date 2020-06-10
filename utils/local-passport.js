//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knexConfig = require('../config/knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        'local-login',
        new LocalStrategy(async(email, password, done) => {
            console.log('-1');
            try {
                console.log('0');
                let users = await knex('users').where({ email: email });
                if (users.length == 0) {
                    console.log('1');
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
                let user = users[0];
                if (user.password === password) {
                    console.log('2');
                    return done(null, user);
                } else {
                    console.log('3');
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        console.log('HI');
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        let users = await knex('users').where({ id: id });
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
};