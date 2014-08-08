var users = require('../controllers/users');

module.exports = function (app) {

    app.get('/', users.getUsers);
    app.get('/users/:id', users.getUserById)

}