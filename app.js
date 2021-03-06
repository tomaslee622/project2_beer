const express = require('express');
const hb = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

// Cross origin resource sharing - on your app server
const cors = require('cors');

// env configuration
require('dotenv').config();

// 1. Baisc setup

// Serving the public files
app.use(express.static('public'));

// Body-parser for passport to work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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

// Testing the chart.js
app.get('/chart', (req, res) => {
    res.sendFile(__dirname + '/chart.html');
});

const apiRoute = require('./routes/api/apiRoutes')(express);
app.use('/data', apiRoute);

app.listen(process.env.PORT);
console.log('application listening to port ' + process.env.PORT);