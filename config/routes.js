var users = require('../controllers/users');
var index = require('../controllers/index');

module.exports = function (app) {
    app.get('/', index.index)
    app.get('/users', users.getUsers);
    app.get('/users/:id', users.getUserById);

    

}