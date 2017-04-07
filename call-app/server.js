var express = require('express');
var path = require('path');
var ejs = require('ejs');
var ip = require('ip');

var pub = path.resolve(__dirname, 'dist');
var app = express();

app.use(express.static(pub));
app.set('views', pub);


app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(3000);

var c = require('child_process')

var url = 'http://' + ip.address() + ':3000/';

c.exec('open ' + url);
console.info('==> 🌎 Listening on  http://' + ip.address() + ':3000');