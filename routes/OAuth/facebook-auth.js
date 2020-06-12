const app = require('express')();

app.get('/auth/facebook', passport.authenticate('facebook'));