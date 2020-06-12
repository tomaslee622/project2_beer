const FacebookStrategy = require('passport-facebook');

module.exports = () => {
    passport.use(
        new FacebookStrategy({
                clientID: '343538859963113',
                clientSecret: '6d2add1a6dd86dd6b16e558edd19705f',
                callbackURL: `/auth/facebook/callback`,
            },
            function(accessToken, refreshToken, profile, cb) {
                User.findOrCreate({ facebookId: profile.id }, function(err, user) {
                    return cb(err, user);
                });
            }
        )
    );
};