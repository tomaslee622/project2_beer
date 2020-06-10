const express = require('express');
const hb = require('express-handlebars');
const knexConfig = require('./config/knexfile')['development'];
const knex = require('knex')(knexConfig);
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

// Local strategy setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const setupLocalPassport = require('./utils/local-passport');
setupLocalPassport(app);
const session = require('express-session');
const localRouter = require('./routes/routes')(express);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    session({
        secret: 'supersecret',
        resave: false,
        saveUninitialized: true,
    })
);

// Implementing
app.use('/', localRouter);

// The end of local strategy setup

const initializePassport = require('./utils/init-passport')(app);

const googleAuth = require('./routes/auth/social-login/google-auth');

// Configure the dotenv for secret information
require('dotenv').config();

// Call the file to initialize the passport setup
const passportSetup = require('./config/passport-setup');

// app.set('trust proxy', 1);

// Use cookie to authenticate user
// app.use(
//     cookieSession({
//         maxAge: 24 * 60 * 60 * 1000,
//         keys: ['key'],
//     })
// );

// Testing the connection to EC2
let query = knex.select('*').from('users');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
query
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err));

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
// app.use('/secret', (req, res) => {
//     console.log(req.session.passport);
//     if (req.session.passport === undefined) {
//         res.send('Unauthorized Access');
//     }
//     res.render('secret');
// });

// Below is the local strategy
// app.post('/login', passport.authenticate('local'), function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
// });

// // Setting both success direct and failure direct
// app.post(
//     '/login',
//     passport.authenticate('local', {
//         successRedirect: '/secret',
//         failureRedirect: '/',
//         failureFlash: true,
//     })
// );

app.listen(3000);
console.log('application listening to port 3000');

// Client ID 935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com
// Client Secret xORIR3m8nf_qfEzGVP4KTPSE