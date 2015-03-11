var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    url: function() {
        if (this.id !== null) {
            return '/api/projects?id=' + this.id;
        } else {
            return '/api/createproject';
        }
    },

    defaults: {
        'id': null,
        'projectname': null,
        'description': null
    }
});
