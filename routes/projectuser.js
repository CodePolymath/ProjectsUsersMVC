var mysql = require('mysql'),
    sql_helper = require('../helpers/sql_conn'),
    extend = require('util')._extend;

var conSettings = extend({multipleStatements: true}, sql_helper.SQL_CONN);
var connection = mysql.createConnection(conSettings);

connection.query('USE blackbook');

exports.createProjectUser = function(req, res) {
    var projectUser = {};
    if (req.body && Object.keys(req.body).length > 1){ // data passed as POST payload
        projectUser.projectId = req.body.projectid;
        projectUser.userId = req.body.userid;
        projectUser.userName = req.body.username;
        projectUser.credentialType = req.body.credentialtype;
    } else { // data passed as querystring (via Postman)
        projectUser.projectId = req.query.projectid;
        projectUser.userId = req.query.userid;
        projectUser.userName = req.query.username;
        projectUser.credentialType = req.query.credentialtype;
    }
    var strSQL = 'INSERT blackbook.projects_users (projectid, userid, username, credentialtype) VALUES (' + projectUser.projectId + ',' + projectUser.userId + ',"' +  projectUser.userName + '","' + projectUser.credentialType + '"); SELECT * FROM blackbook.projects_users WHERE id = LAST_INSERT_ID()';
    connection.query(strSQL, function(err, rows){
        if (!err) { // no matching data
            res.status(201);
            res.send(rows);
            return;
        } else {
            res.status(409);
            res.send('Entry already exists');
            return;
        }
    });
};

exports.deleteProjectUser = function(req, res){
    var id;
    if (req.body && Object.keys(req.body).length > 0){ // data passed as POST payload
        id = req.body.id;
    } else { // data passed as querystring (via Postman)
        id = req.query.id;
    }
    var strSQL = 'DELETE FROM blackbook.projects_users WHERE id = ' + id;
    connection.query(strSQL, function(err, rows){
        if (!err) { // no matching data
            res.status(204);
            res.send(rows);
            return;
        } else {
            res.status(500);
            res.send(err.message);
            return;
        }
    });
};

exports.getAll = function(req, res) {
    var projectUser = {};
    if (req.body && Object.keys(req.body).length > 1){ // data passed as POST payload
        projectUser.projectId = req.body.projectid;
        projectUser.userId = req.body.userid;
    } else { // data passed as querystring (via Postman)
        projectUser.projectId = req.query.projectid;
        projectUser.userId = req.query.userid;
    }
    var strSQL = 'SELECT * FROM blackbook.projects_users';
    if (projectUser.projectId) {
        strSQL = strSQL + ' WHERE projectid = ' + projectUser.projectId.toString();
    } else if (projectUser.userId) {
        strSQL = strSQL + ' WHERE userid = ' + projectUser.userId.toString();
    }
    connection.query(strSQL, function(err, rows){
        if (!err) { // no matching data
            res.status(201);
            res.send(rows);
            return;
        } else {
            res.status(500);
            res.send('An unknown server error occurred');
            return;
        }
    });
};
