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

    `/Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot`

MySQL for Windoze: http://dev.mysql.com/doc/refman/5.0/en/windows-start-command-line.html

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
    GRANT SELECT, INSERT, UPDATE ON `blackbook`.* TO 'blackbook_node'@'localhost';

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
