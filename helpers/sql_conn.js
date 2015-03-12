var getSQLport = function(){ // attempt to dynamically set default MySQL port
    if (/^win/.test(process.platform)) {
        return 3306; // windoze default mysql port
    } else {
        return 8889; // MAMP / os-x default mysql port
    }
}

exports.SQL_CONN = {
    host: 'localhost',
    user: 'blackbook_node',
    password: 'wLc0Dr53zAb2BfWp',
    port: getSQLport()
};
