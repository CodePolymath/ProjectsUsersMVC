var crypto = require('crypto');

exports.hash = function(pass, salt){ // create a sha512 hash of a password using a salt
    var h = crypto.createHash('sha512');

    h.update(pass);
    h.update(salt);

    return h.digest('base64');
};

exports.salt = function(){ // create a random salt
    return crypto.randomBytes(16).toString('base64');
};
