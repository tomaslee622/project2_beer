const express = require('express');
const hb = require('express-handlebars');
const knexConfig = require('./config/knexfile')['development'];
const knex = require('knex')(knexConfig);
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();

const googleAuth = require('./routes/auth/social-login/google-auth');

// Configure the dotenv for secret information
require('dotenv').config();

// Call the file to initialize the passport setup
const passportSetup = require('./config/passport-setup');

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Use cookie to authenticate user
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: ['key'],
    })
);

// Testing the connection to EC2
// let query = knex.select('*').from('users');
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// query
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => console.log(err));

// Setting handlebars as view engine
app.engine('handlebars', hb({ defaultLayout: 'login_main' }));
app.set('view engine', 'handlebars');

// Serving the public files
app.use(express.static('public'));

// Directing to Google authentication
app.use('/auth', googleAuth);

// Index display
app.get('/', (req, res) => {
    res.render('login_input');
});

// Testing if the user is logged in with cookies
app.use('/secret', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('secret');
    }
    res.send('Unauthorized Access');
});

app.listen(3000);
console.log('application listening to port 3000');

// Client ID 935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com
// Client Secret xORIR3m8nf_qfEzGVP4KTPSE