var mysql = require('mysql'),
    sql_helper = require('../helpers/sql_conn');

var connection = mysql.createConnection(sql_helper.SQL_CONN);

connection.query('USE blackbook');

exports.getAll = function(req, res) {
    var filterBy = req.query.filter;
    var groupBy = req.query.group;

    var strSQL = 'SELECT id, projectname, description FROM blackbook.projects;';
    if (typeof filterBy !== 'undefined' && filterBy !== null){
        var splitFilter = filterBy.split('|');
        var filterCol = splitFilter[0];
        var filterVal = splitFilter[1];
        strSQL = strSQL + ' WHERE ' + filterCol.toLowerCase() + ' = "' + filterVal + '"';
    }

    if (typeof groupBy !== 'undefined' && groupBy !== null){
        strSQL = strSQL + ' GROUP BY ' + groupBy.toLowerCase();
    }

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
