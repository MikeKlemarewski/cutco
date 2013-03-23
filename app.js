var express = require('express');
var http = require('http');
var redis = require('redis');
var fs = require('fs');
var child_process = require('child_process');
var async = require('async');
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



app.get('/:url', function(req, res){

        checkPage(req.params.url, function(res){
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(res);
        });

});

function checkPage(url, callback){
        ps = child_process.spawn('lib/phantomjs/bin/phantomjs', ['lib/check.js', url]);
        var blob = '';
        ps.stdout.on('data', function(data){
                blob += data;
        });

        ps.stdout.on('end', function(){
                console.log(blob);
        });

        ps.stderr.on('data', function(data){
                console.log('stderr: ' + data);
        });
}

app.listen(PORT);
