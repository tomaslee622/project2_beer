const express = require('express');
const hb = require('express-handlebars');
const knexConfig = require('./knexfile')['development'];
const knex = require('knex')(knexConfig);
const bodyParser = require('body-parser');

const app = express();

// 1. Baisc setup

// Serving the public files
app.use(express.static('public'));

// Body-parser for passport to work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting handlebars as view engine
app.engine('handlebars', hb({ defaultLayout: 'login_main' }));
app.set('view engine', 'handlebars');

// 2. Passport authentication setup

// Setup cookie
const setupCookie = require('./utils/init-cookie')(app);

// Local passport setup
const setupLocalPassport = require('./utils/strategies/local-passport');
setupLocalPassport(app);

// Google Strategy setup
const googleSetup = require('./utils/strategies/google-strategy');

// Facebook Strategy setup
const facebookSetup = require('./utils/strategies/facebook-strategy');

// Auehtnication routes
const localRouter = require('./routes/routes')(express);
const googleAuth = require('./routes/OAuth/google-auth');
const facebookAuth = require('./routes/OAuth/facebook-auth');

// Directing to local authentication
app.use('/', localRouter);

// Directing to Google authentication
app.use('/auth', googleAuth);

// Directing to Facebook authentication
app.use('/auth', facebookAuth);

// Testing the connection to EC2
let query = knex.select('*').from('users');

query
    .then((data) => {
        if (data !== null) {
            // console.log(data);
            console.log('Database connected');
        }
    })
    .catch((err) => console.log(err));

app.listen(3000);
console.log('application listening to port 3000');

// Client ID 935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com
// Client Secret xORIR3m8nf_qfEzGVP4KTPSE

// FB app secret: 6d2add1a6dd86dd6b16e558edd19705f
// FB app ID: 343538859963113