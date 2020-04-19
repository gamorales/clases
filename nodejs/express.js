const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    name: 'la-cookie',
    keys: ['sdfsdgd9f8dfgdf', 'ñlk345j4356j3h7']
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('static', {
    etag: false, // No refresca el caché
    maxAge: '5h' // Hasta por 5 horas
}));

app.get('/saludo', function(req, res) {
    res.send(`Hola ${req.query.param} ${__dirname} ${__filename}`);
});

app.post('/', function(req, res) {
    res.send(`Hola ${req.body.param}`);
});

app.get('/web', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname
    })
});

app.get('/render', function(req, res) {
    res.render('index');
});

app.get('/cookies', function(req, res) {
    req.session.cantidades = req.session.cantidades || 0;
    req.session.cantidades = req.session.cantidades + 1;
    res.send(`Hola ${req.session.cantidades} visitas`);
});

app.listen(3000);