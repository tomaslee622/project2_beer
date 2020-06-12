const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    const checkAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            console.log(req.isAuthenticated());
            return next();
        } else {
            res.redirect('/');
            console.log(req.isAuthenticated());
        }
    };

    const checkNotAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/success');
        }
        return next();
    };

    router.get('/', checkNotAuthenticated, (req, res) => {
        res.render('login_input');
    });

    router.get('/success', checkAuthenticated, (req, res) => {
        res.send('Hello, ' + req.user.email + ' you successfully logged in');
    });

    router.post(
        '/login',
        passport.authenticate('local-login', {
            successRedirect: '/success',
            failureRedirect: '/error',
        })
    );

    router.get('/error', (req, res) => {
        res.send('Opps, error!');
    });

    return router;
};