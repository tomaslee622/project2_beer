const express = require('express');
const hb = require('express-handlebars');
const knexConfig = require('./knexfile')['development'];
const knex = require('knex')(knexConfig);
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Google Strategy setup
const googleSetup = require('./utils/strategies/google-strategy');

// Facebook Strategy setup
const facebookSetup = require('./utils/strategies/facebook-strategy');

// Local strategy setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const setupLocalPassport = require('./utils/local-passport');
setupLocalPassport(app);
const session = require('express-session');
const localRouter = require('./routes/routes')(express);

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

const googleAuth = require('./routes/OAuth/google-auth');

// Configure the dotenv for secret information
require('dotenv').config();

// Call the file to initialize the passport setup
// const passportSetup = require('./config/passport-setup');

// Testing the connection to EC2
let query = knex.select('*').from('users');
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

query
    .then((data) => {
        if (data !== null) {
            console.log('Database connected');
        }
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

app.listen(3000);
console.log('application listening to port 3000');

// Client ID 935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com
// Client Secret xORIR3m8nf_qfEzGVP4KTPSE

// FB app secret: 6d2add1a6dd86dd6b16e558edd19705f
// FB app ID: 343538859963113