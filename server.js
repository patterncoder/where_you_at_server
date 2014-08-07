//var http = require('http')
var port = process.env.PORT || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
///**
// * Module dependencies.
// */

var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


//var bodyParser = require('body-parser');

var app = express();
var config = require('./config');
//var config = require('./config')[env];
//require('./mongoose')(config);
//var routes = require('./routes');
//console.log(config.db)
//// all environments
//app.set('port', process.env.PORT || 3000);

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
////app.use(express.static(path.join(__dirname, 'public')));

//// development only
////if ('development' == app.get('env')) {
////  app.use(express.errorHandler());
////}

////app.get('/', routes.index);
app.get('/', function (req, res) {
    res.send("hello");
});


app.listen(port);
//console.log('Express server listening on port ' + config.port);
