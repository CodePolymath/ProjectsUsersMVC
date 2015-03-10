var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    url: function() {
        switch (true) {
            case this.id:
                return '/api/projectuser/' + this.id;
            case this.projectid:
                return '/api/projectuser?projectid=' + this.projectid;
            case this.userid:
                return '/api/projectuser?userid=' + this.user_id;
            default:
                return '/api/projectuser';
        }
    },

    defaults: {
        'id': null,
        'projectid': null,
        'userid': null,
        'username': 'No Name',
        'credentialtype': 'http'
    }
});
