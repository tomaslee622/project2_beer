const router = require('express').Router();
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook'));

router.get(
    '/facebook/redirect',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/error',
    })
);

module.exports = router;