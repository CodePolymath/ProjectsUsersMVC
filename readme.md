# Challenge: Developer Blackbook #

**Description:**

Your challenge  should you choose to accept it  is to create a credential blackbook. A lean app that keeps track of projects and their respective credentials. This app should allow us to accomplish the following objectives:

* Add projects with a name and a description

* Add, edit, list, and delete credentials under each project with name, description and all fields required by the credential type.  Ex. SSH has host, username, password, and port, but a website may only have a username and password.

With the above information think through, plan and execute using any programming language, frameworks and libraries you feel best to create this project in the least amount of time based on the requirements below.

**Time:**

Please make this app as lean or robust as you would like, and we estimate the core functionality to take within 20 hours. "Finishing" this app is not a requirement but would be a bonus. Our goal is to primarily see decisions you would make as you put together this project.

**REQUIRED:**

* Environment Setup

* Data Storage

* Sample Data

* API

* Web Page/App

* Forking this project into a private bitbucket repo

**Bonus:**

* User Registration/Login

* Sharing of credentials with other users

* SQL solution

* Object Oriented code (back-end and front-end)

* An API with a RESTful architecture

* Web App is styled and pleasing to look at

* Web App is responsive

* Web App uses data modeling for API endpoints

* Web App is AJAX-y (one-page js app)

* Minimal wheels re-invented

* We are WOWed

**Deliverables:**

* URL to the working app

* Share this repo with tim.wickstrom@datafi.com

* Update the README file with the following:

    * Installation instructions if needed

    * Instructions on how to use the app

    * An explanation of what you did and why for all aspects of the application preferably with time spent on all the various aspects of development (including research time).

** INSTRUCTIONS: **

### This is a sample Backbone app using MySQL, Node and Express.

To run it, you must install Node:

http://nodejs.org/download/

You will also need an instance of MySQL running locally:

Windoze: http://dev.mysql.com/downloads/windows/

OS X: http://www.mamp.info/en/downloads/

To start a terminal session of MySQL:

MAMP: Start up a MySQL terminal session:

    /Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot

MySQL for Windoze:

http://dev.mysql.com/downloads/mysql/
http://dev.mysql.com/doc/refman/5.6/en/windows-start-command-line.html

In cmd.exe:

    cd "C:\Program Files\MySQL\MySQL Server 5.6\bin"
        (you may need to adjust your MySql folder version)
    mysqladmin -u root password password
    mysqld
    mysql -h localhost -u root -p

At the password prompt, type:

    password

You may have to adjust the port that MySQL is expected to run under in the app. There are TODO: comments next to the MySQL port number in the /routes/users.js and /routes/login.js files.

Once you have installed Node and have MySQL running, you should be able to navigate to the solution's root folder on your local machine via a terminal app.

The required node_modules are not included in this repo, you can install them by running:

`npm install`

in a terminal app in the root directory of the solution. If that doesn't solve the missing dependency issue, you can delete everything in the /node_modules folder and run `npm install` again. For permission errors, try running `sudo npm install` or `npm install` with admin rights.

`node server`

to start the app.

The app should then be running under:

//localhost:3000

**SQL:**

    CREATE DATABASE blackbook;

    CREATE USER 'blackbook_node'@'localhost' IDENTIFIED BY 'wLc0Dr53zAb2BfWp';
    GRANT SELECT, INSERT, UPDATE, DELETE ON `blackbook`.* TO 'blackbook_node'@'localhost';

    CREATE TABLE `blackbook`.`users` (
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `username` VARCHAR(30) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        `password` CHAR(88) NOT NULL,
        `salt` CHAR(24) NOT NULL,
        `city` VARCHAR(50) NOT NULL,
        `state` CHAR(2) NOT NULL,
        `gender` CHAR(1) NOT NULL,
        `age` INT NOT NULL
    ) ENGINE = InnoDB;

    CREATE TABLE `blackbook`.`projects` (
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `projectname` VARCHAR(30) NOT NULL,
        `description` VARCHAR(50) NOT NULL
    ) ENGINE = InnoDB;

    CREATE TABLE `blackbook`.`credential_types` (
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `description` VARCHAR(30) NOT NULL,
        `fields` VARCHAR(200) NULL
    ) ENGINE = InnoDB;

    CREATE TABLE `blackbook`.`projects_users` (
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `projectid` INT NOT NULL,
        `userid` INT NOT NULL,
        `credentialtype` INT NOT NULL,
        CONSTRAINT uc_project_user UNIQUE (projectid,userid,credentialtype),
        INDEX credential_type_idx (credentialtype),
        `username` VARCHAR(30),
        `password` CHAR(88) NOT NULL,
        `salt` CHAR(24) NOT NULL,
        `port` VARCHAR(5),
        `host` VARCHAR(20)
    ) ENGINE = InnoDB;

    INSERT `blackbook`.`credential_types` (description, fields) VALUES ('web', 'username,password');
    INSERT `blackbook`.`credential_types` (description, fields) VALUES ('ssh', 'username,password,host,port');
    INSERT `blackbook`.`credential_types` (description, fields) VALUES ('ftp', 'username,password,port');

** Tech stack decisions: **

backbone - used as a display layer JavaScript MVC. It was chosen because it is very basic and doesn't require too much overhead to get an app up and running quickly.

body-parser - a plugin which allows express.js to "read" POSTed values

browserify and browserify-middleware - very powerful plugin, similar to GRUNT. browserify allows all clientside modules to make require()-like dependency calls and reuse libraries included in the Node / Express app. It also compiles all client side files into one single .js file to deliver to the user.

crypto-js - no one should EVER store passwords in plain text. crypto-js was used to store individually salted hashes of the users' passwords in the db.

express - used as the server app to both respond to API calls, and act as a entrypoint for the client app, as well as packing all files and dependencies via browserify.

jade - HTML templating

jquery - because jQuery

ms - dependency for browserify

mysql - db solution that runs on all platforms

prepare-response - dependency for browserify

templatizer - converts all .jade html template files into executable JavaScript functions for fast usage in the client (no compiling HTML templates "on the fly").

uglify - dependency for browserify to obfuscate code (not implemented)

** Developers post-mortem thoughts: **

Test data is not provided because the Backbone UI is setup to do enough CRUD operations to create useful test data.

Halfway through development, I realized a noSQL solution would have worked better because of the need to return "deep" data models from the server, but I did not have the time to invest in refactoring away from MySQL, which was already installed on my dev machine and working when I began development (no port conflicts, setup, etc to handle).

The api is a little hacky, I didn't concentrate too much on data-modeling or inheritence, and there is no validation, connection pooling or security on the routes, which should have been done with oAuth or httpAuth. However, the passwords are individually salted and hashed with 256 SHA for irreverisbly secure storage.

The front end is very very basic, and could use some refactoring. If I had more time to invest, more of the subviews (such as those for the collection of users assigned to each project) should be built into true subview modules, instead of HTML that is rendered via JavaScript and documentFragments. This mish-mash of DOM rendering methods does have the side-effect of showing the flexibility of Backbone.

The CSS was so minimal that I didn't bother to use a CSS preprocessor. SCSS compiled via Browserify with something like Stylus when the app is spun-up would be ideal as the CSS needs get more complex. The CSS is mostly someone else's Bootstrap theme with some small tweaks of my own (no need to reinvent Bootstrap).

I began setting up the various credential types and fields on the MySQL server for various login types, but ran out of time to commit to the project, so the UI and CRUD on those are not implemented.

All JavaScript was run through jsHint with basic settings (compiled files, such as the templates.js file that serves all HTML templates will not pass jsHint).

Overall, I spent about 18 hours on this project, broken down roughly as follows:

Day 1: 6 hours - technology stack decisions, setting up api routes, creating MySQL server tables, testing api routes, starting basic UI templating, views, models and css

Day 2: 3 hours - small improvements to api routes, UI tweaks, finshing api routes, moving hashing functions and mysql connection settings to helper modules

Day 3: 9 hours - finishing all clientside CRUD operations, setting up UI for create / delete on project-user relationships, major CSS overhaul, testing, updating readme
