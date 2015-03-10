var mysql = require('mysql'),
    sql_helper = require('../helpers/sql_conn');

var connection = mysql.createConnection(sql_helper.SQL_CONN);


exports.getAll = function(req, res) {
    var strSQL = 'SELECT id, projectname, description FROM blackbook.projects;';

    connection.query(strSQL, function(err, rows){
        if (rows.length === 0) { // no matching data
            res.status(204);
            res.send('No matching records found. Please try again');
            return;
        }
        res.send(rows);
    });
};

exports.createProject = function(req, res) {
    var project = {};

    if (req.body && Object.keys(req.body).length > 1){ // data passed as POST payload
        project.projectName = req.body.projectname;
        project.description = req.body.description;
    } else { // data passed as querystring (via Postman)
        project.projectName = req.query.projectname;
        project.description = req.query.description;
    }
    for (var prop in project) {
        if (typeof project[prop] === 'undefined' || project[prop] === null){
            res.status(204);
            res.send('ERROR: Please specify a ' + prop);
            return;
        }
    }

    var strSQL = 'INSERT INTO blackbook.projects (projectname, description) VALUES ("' + project.projectName + '","' + project.description + '");';

    connection.query(strSQL, function(err, rows){
        if (!err){
            res.send(rows);
        } else {
            res.status(204);
            res.send('There was a problem creating a new project. Please try again');
        }
    });
};
