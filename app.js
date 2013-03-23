var express = require('express');
var http = require('http');
var redis = require('redis');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(express.bodyParser());

client = redis.createClient(null, null, {detect_buffers: true});

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/leaderboard/', function(req, res){

    if(req.query['page']){
        num = req.query('page');
        console.log(num);
    }

    res.render('leaderboard.html');
});

app.post('/', function(req, res){
    client.set(req.body.url, req.body.size.toString());
});

app.listen(PORT);
