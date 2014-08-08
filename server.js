
// require express
var express = require('express');
// set env variable to production or development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// express does not ship with body parser...load in connect body parser
var bodyParser = require('body-parser');
// fire up express
var app = express();
// bring back a config object based on the environment we are in
var config = require('./config/config')[env];
// fire up mongoose according to our config object based on environment
require('./mongoose')(config);
// bring in all files from the routes folder
var routes = require('./routes');
// set up express to use the bodyParser we required above
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// just to get things working send back a mongoose query
require('./config/routes')(app);
//app.get('/', routes.index);

// config is done so start listening on the port specified in the config file
app.listen(config.port);
console.log('Express server listening on port ' + config.port);
