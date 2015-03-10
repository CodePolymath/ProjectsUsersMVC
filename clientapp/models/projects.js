var Backbone = require('backbone'),
    ProjectModel = require('../models/project');

module.exports = Backbone.Collection.extend({
    model: ProjectModel,

    url: '/api/projects'
});
