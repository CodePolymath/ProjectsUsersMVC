var sql_helper = require('../helpers/sql_conn'),
    mysql = require('mysql'),
    hasher = require('../helpers/hash');

var connection = mysql.createConnection(sql_helper.SQL_CONN);

exports.getAll = function(req, res) {
    var filterBy = req.query.filter;
    var groupBy = req.query.group;

    var strSQL = 'SELECT id, username, email, gender, age, city, state FROM blackbook.users;';
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
        if (!rows || rows.length === 0) { // no matching data
            res.status(204);
            res.send('No matching records found. Please try again');
            return;
        }
        res.send(rows);
    });
};

exports.checkUserExists = function (req, res) {
    var userName = req.query.username;
    if (!userName) {
        return;
    }
    var strSQL = 'SELECT Count(username) as UserCount FROM blackbook.users WHERE username = "' + userName + '" GROUP BY username;';
    connection.query(strSQL, function(err, rows){
        if (!err){
            res.send(rows);
        } else {
            res.status(403);
            res.send('There was a problem querying that user. Please try again');
        }
    });
};

exports.createUser = function(req, res) {
    var user = {};

    if (req.body && Object.keys(req.body).length > 1){ // data passed as POST payload
        user.userName = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.city = req.body.city;
        user.state = req.body.state;
        user.gender = req.body.gender;
        user.age = req.body.age;
    } else { // data passed as querystring (via Postman)
        user.userName = req.query.username;
        user.password = req.query.password;
        user.email = req.query.email;
        user.city = req.query.city;
        user.state = req.query.state;
        user.gender = req.query.gender;
        user.age = req.query.age;
    }
    for (var prop in user) {
        if (typeof user[prop] === 'undefined' || user[prop] === null){
            res.status(204);
            res.send('ERROR: Please specify a ' + prop);
            return;
        }
    }
    user.salt = hasher.salt(); // get a random per-user salt
    user.hash = hasher.hash(user.password, user.salt); // hash the user password

    var strSQL = 'INSERT INTO blackbook.users (username, email, password, salt, city, state, gender, age) SELECT "' + user.userName + '","' + user.email + '","' + user.hash + '","' + user.salt + '","' + user.city + '","' + user.state + '","' + user.gender + '",' + user.age.toString() + ';';

    connection.query(strSQL, function(err, rows){
        if (!err){
            res.send(rows);
        } else {
            res.status(403);
            res.send('There was a problem creating a new user. Please try again');
        }
    });
};
