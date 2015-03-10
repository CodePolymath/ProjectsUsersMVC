/* basic entry point, compiles Jade template and sends it to the client */
exports.start = function(req, res) {
    res.render('../templates/index', {title: 'Sample Backbone App', message: 'Welcome to the Sample App'});
};
