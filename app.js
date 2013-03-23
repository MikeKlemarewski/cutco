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

app.post('/', function(req, res){

    checkPage(req.body.url, function(result, err){
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                client.set(result.url, result.size);
                res.writeHead(200, {'Content-Type':'application/json'});
                res.end(result.toString());
            }
    });
});

app.get('/leaderboard/', function(req, res){

    if(req.query['page']){
        num = req.query('page');
        console.log(num);
    }

    res.render('leaderboard.html');
});


function checkPage(url, callback){
    ps = child_process.exec('lib/phantomjs/bin/phantomjs lib/check.js ' + url, function(error, stdout, stderr){

        stdout = stdout.replace(/(\r\n|\n|\r)/gm,"");
        results = stdout.split(',');

        data = {};
        data['url'] = results[0];
        data['size'] = parseInt(results[1]);

        if(data['error']){
            callback(null, true);
        }

        callback(data, null);
    });
}

app.listen(PORT);
