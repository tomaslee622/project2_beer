const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(
    new GoogleStrategy({
            clientID: '935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com',
            clientSecret: 'xORIR3m8nf_qfEzGVP4KTPSE',
            callbackURL: 'http://localhost:3000/auth/google/redirect',
        },
        function(accessToken, refreshToken, profile, done) {
            // passport callback function
            console.log(profile);
            // console.log(profile.id, profile.emails[0].value);
            return done(null, profile);
        }
    )
);

// const loginOrCreate = (email, done) => {
//     let query = knex.select('*').from('users').where({ email: email });
//     query
//         .then((data) => {
//             if (data.length == 1) {
//                 console.log('User exists');
//                 done(null, email);
//             } else {
//                 console.log('User does not exist');
//                 done(null, email);
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//             done(err, email);
//         });
// };