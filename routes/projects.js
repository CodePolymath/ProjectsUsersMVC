var mysql = require('mysql'),
    extend = require('util')._extend;
    sql_helper = require('../helpers/sql_conn');

var conSettings = extend({multipleStatements: true}, sql_helper.SQL_CONN);
var connection = mysql.createConnection(conSettings);

exports.getAll = function(req, res) {
    var strSQL = 'SELECT id, projectname, description FROM blackbook.projects;';

    connection.query(strSQL, function(err, rows){
        if (err) {
            res.send(err);
            return;
        }
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

    if (req.body && Object.keys(req.body).length > 0){ // data passed as POST payload
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

exports.deleteProject = function(req, res) {
    var project = {};

    if (req.body && Object.keys(req.body).length > 0){ // data passed as POST payload
        project.projectId = req.body.id;
    } else { // data passed as querystring (via Postman)
        project.projectId = req.query.id;
    }

    var strSQL = 'DELETE FROM blackbook.projects WHERE id = ' + project.projectId + '; DELETE FROM blackbook.projects_users WHERE projectid = ' + project.projectId + ';';

    connection.query(strSQL, function(err, rows){
        if (!err){
            res.send(rows);
        } else {
            res.status(500);
            res.send('There was a problem deleting the project. Please try again');
        }
    });
};
