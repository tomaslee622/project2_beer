const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const knexConfig = require('../knexfile')['development'];
const knex = require('knex')(knexConfig);

passport.serializeUser((user, done) => {
    console.log('User ' + user + ' login using Google');
    done(null, user);
});

// Failure message for local login
// passport.authenticate('local', {
//     failureFlash: 'Invalid username or password.',
// });

// Success message for local login
// passport.authenticate('local', { successFlash: 'Welcome!' });

passport.deserializeUser((user, done) => {
    console.log('User ' + user + ' has come back');
    done(null, user);
});

passport.use(
    new GoogleStrategy({
            // options for the google stratgegy
            callbackURL: '/auth/google/redirect',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
        (accessToken, refreshToken, profile, done) => {
            // passport callback function
            console.log('Callback function is fired!');
            // console.log(profile.id, profile.emails[0].value);
            loginOrCreate(profile.emails[0].value, done);
        }
    )
);

const loginOrCreate = (email, done) => {
    let query = knex.select('*').from('users').where({ email: email });
    query
        .then((data) => {
            if (data.length == 1) {
                console.log('User exists');
                done(null, email);
            } else {
                console.log('User does not exist');
            }
        })
        .catch((err) => {
            console.log(err);
            done(err, email);
        });
};