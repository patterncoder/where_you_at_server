
/**
 * Module dependencies.
 */

var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var bodyParser = require('body-parser');

var app = express();
var config = require('./config')[env];
require('./mongoose')(config);
var routes = require('./routes');
console.log(config.db)
// all environments
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(express.static(path.join(__dirname, 'public')));

// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

app.get('/', routes.index);


app.listen(config.port);
console.log('Express server listening on port ' + config.port);
