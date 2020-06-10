const passport = require('passport');

module.exports = (app) => {
    // app.use(passport.initialize());
    // app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log('Serializing ' + user);
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        console.log('Deserializing ' + user);
        done(null, user);
    });

    // require('./strategies/facebook-strategy')(passport);
};