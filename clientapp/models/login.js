var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    url: '/api/login',

    defaults: {
        'username': null,
        'password': null
    }
});
