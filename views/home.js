/* basic entry point, compiles Jade template and sends it to the client */
exports.start = function(req, res) {
    res.render('../templates/index', {title: 'Blackbook App', message: 'Welcome to the Blacbook App'});
};
