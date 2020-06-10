const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/error'); // or redirect to '/signup'
    }

    router.get('/secret', isLoggedIn, (req, res) => {
        res.send('Here you go, a secret');
    });

    router.get('/login', (req, res) => {
        res.render('login_input');
    });

    router.get('/success', (req, res) => {
        res.send('You successfully logged in');
    });

    router.post(
        '/login',
        passport.authenticate('local-login', {
            successRedirect: '/success',
            failureRedirect: '/error',
        })
    );

    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    return router;
};