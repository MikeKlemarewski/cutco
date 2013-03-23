var express = require('express');
var http = require('http');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('static'));

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/leaderboard', function(req, res){
    res.render('leaderboard.html');
});

app.listen(PORT);
