const router = require('express').Router();
const passport = require('passport');

console.log('HI');

// // auth login
// router.get('/login', (req, res) => {
//     res.render('login');
// });

// auth with google
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

// callback route for google to redirect to
router.get(
    '/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        console.log('Yo');
        res.redirect('/');
    }
);

module.exports = router;