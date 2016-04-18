/**
 * Created by Frederick on 12/04/2016.
 */
var users = require('../../app/controllers/users.server.controller'),
    favours = require('../../app/controllers/favours.server.controller');
module.exports = function(app) {
    //get should have requires login as well, as he list will only show own favours
    app.route('/api/favours')
        .get(favours.list)
        .post(users.requiresLogin, favours.create);
    app.route('/api/favours/:favourId')
        .get(favours.read)
        .put(users.requiresLogin, favours.hasAuthorization, favours.
            update)
        .delete(users.requiresLogin, favours.hasAuthorization, favours.
            delete);
    app.param('favourId', favours.favourByID);
};