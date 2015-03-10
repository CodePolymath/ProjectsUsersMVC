var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    url: function() {
        if (this.id !== null) {
            return '/api/users/' + this.id;
        } else {
            return '/api/createuser';
        }
    },

    defaults: {
        'id': null,
        'username': null,
        'email': null,
        'password': null,
        'city': null,
        'state': null,
        'gender': null,
        'age': null
    }
});
