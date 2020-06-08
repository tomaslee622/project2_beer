const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('homepage');
});

app.post('/login', (req, res) => {
    console.log(req.);
});

app.listen(3000);