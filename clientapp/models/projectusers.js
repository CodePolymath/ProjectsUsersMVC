var Backbone = require('backbone'),
    ProjectModel = require('../models/projectuser');

module.exports = Backbone.Collection.extend({
    model: ProjectModel,

    url: '/api/projectuser'
});
