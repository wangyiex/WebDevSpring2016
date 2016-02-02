var express = require('express');
var app = express();
app.get('/', function(req,res){
    res.send('hello world');
});
app.get('/a', function(req,res){
    res.send('hello worldaaaa');
});

app.listen(3000);
