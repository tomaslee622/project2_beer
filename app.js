const express = require('express');
const hb = require('express-handlebars');
const app = express();
const knexConfig = require('./knexfile')['development'];
const knex = require('knex')(knexConfig);

let query = knex.select('*').from('users');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
query
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err));

require('dotenv').config();

app.engine('handlebars', hb({ defaultLayout: 'login_main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login_input');
});

app.post('/login', (req, res) => {});

app.listen(3000);

console.log('application listening to port 3000');

// Client ID 935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com
// Client Secret xORIR3m8nf_qfEzGVP4KTPSE