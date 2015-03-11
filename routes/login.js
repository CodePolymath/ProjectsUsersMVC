var sql_helper = require('../helpers/sql_conn'),
    mysql = require('mysql'),
    hasher = require('../helpers/hash');

var connection = mysql.createConnection(sql_helper.SQL_CONN);

exports.login = function(req, res) {
    var user = {};
    if (req.body && Object.keys(req.body).length > 0){ // data passed as POST payload
        user.userName = req.body.username;
        user.password = req.body.password;
    } else { // data passed as querystring (via Postman)
        user.userName = req.query.username;
        user.password = req.query.password;
    }

    var strSQL = 'SELECT username, salt, password FROM blackbook.users WHERE username = "' + user.userName + '" LIMIT 1;';

    connection.query(strSQL, function(err, rows){
        if (rows.length === 0) { // non existant username
            res.status(403);
            res.send('Could not login. Please try again');
            return;
        }
        var row = rows[0]; // first row of data
        user.salt = row.salt;

        var testHash = hasher.hash(user.password, row.salt); // get a testable hash using supplied password and mysql stored salt
        if (testHash === row.password) { // authenticated user
            res.send(row);
        } else { // incorrect password
            res.status(403);
            res.send('Could not login. Please try again.');
        }
    });
};
