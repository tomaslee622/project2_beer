const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const loginOrCreate = require('./loginOrCreate');

passport.use(
    new GoogleStrategy({
            clientID: '935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com',
            clientSecret: 'xORIR3m8nf_qfEzGVP4KTPSE',
            callbackURL: 'http://localhost:3000/auth/google/redirect',
        },
        function(accessToken, refreshToken, profile, done) {
            loginOrCreate(profile.emails[0].value, done, {
                provider: 'google',
                google_id: profile.id,
            });
        }
    )
);