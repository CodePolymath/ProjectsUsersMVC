var Backbone = require('backbone'),
    ProjectModel = require('../models/project');

module.exports = Backbone.Collection.extend({
    model: ProjectModel,

    url: function(){
        if (this.id) {
            return '/api/projects?id=' + this.id;
        } else {
            return '/api/projects';
        }
    }
});
