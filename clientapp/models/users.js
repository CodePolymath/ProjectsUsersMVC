var Backbone = require('backbone'),
    UserModel = require('../models/user');

module.exports = Backbone.Collection.extend({
    model: UserModel,

    url: '/api/users'
});
