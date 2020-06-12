const FacebookStrategy = require('passport-facebook');
const passport = require('passport');
const loginOrCreate = require('./loginOrCreate');

passport.use(
    new FacebookStrategy({
            clientID: '343538859963113',
            clientSecret: '6d2add1a6dd86dd6b16e558edd19705f',
            callbackURL: `http://localhost:3000/auth/facebook/redirect`,
            profileFields: ['emails'],
        },
        function(accessToken, refreshToken, profile, done) {
            loginOrCreate(profile.emails[0].value, done, {
                provider: 'facebook',
                facebook_id: profile.id,
            });
        }
    )
);