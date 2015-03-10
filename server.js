var express = require('express'),
    home = require('./views/home'),
    login = require('./routes/login'),
    users = require('./routes/users'),
    projectuser = require('./routes/projectuser'),
    projects = require('./routes/projects'),
    bodyParser = require('body-parser'),
    browserify = require('browserify-middleware'),
    templatizer = require('templatizer');

var app = express();

app.set('view engine', 'jade');
app.use('/css', express.static(__dirname + '/public/css')); // allow access to public css files
app.use('/fonts', express.static(__dirname + '/public/fonts'));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

/* templatizer converts all .jade based html template files into a executable JavaScript function which can be called in the client */
templatizer(__dirname + '/clienttemplates', __dirname + '/clientapp/templates.js', {namespace: 'app'});

/* browserify allows AMD require() type dependency calls in the client by compiling all related client-side code into a single JavaScript file */
app.get('/app.js', browserify('./clientapp/app.js'));

/* ALL public routes */
app.get('/', home.start); // entrypoint for the app
app.post('/api/createproject', projects.createProject);
app.post('/api/createuser', users.createUser);
app.post('/api/login', login.login);
app.post('/api/projectuser', projectuser.createProjectUser);
app.get('/api/login', login.login);
app.get('/api/projects', projects.getAll);
app.get('/api/users', users.getAll);
app.get('/api/projectuser', projectuser.getAll);
app.get('/api/checkuser', users.checkUserExists);
app.delete('/api/projectuser', projectuser.deleteProjectUser)
/* END ALL public routes */

app.listen(3000);
console.log('Listening on port 3000...');
