var Backbone = require('backbone'),
    HomeView = require('./views/home'),
    NewProject = require('./views/newproject'),
    Projects = require('./views/projects'),
    NewUser = require('./views/newuser'),
    Users = require('./views/users');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        'home': 'home',
        'newuser': 'newuser',
        'users': 'users',
        'newproject': 'newproject',
        'projects': 'projects'
    },

    home: function (){
        var newView = new HomeView();
        app.renderView(newView);
        this.setNav('navHome');
    },

    newproject: function() {
        var newView = new NewProject();
        app.renderView(newView);
        this.setNav('navNewProject');
    },

    projects: function() {
        var newView = new Projects();
        this.setNav('navProjects');
    },

    newuser: function() {
        var newView = new NewUser();
        app.renderView(newView);
        this.setNav('navNewUser');
    },

    users: function() {
        var newView = new Users();
        this.setNav('navUsers');
    },

    setNav: function(navElement){
        $('ul.nav li').removeClass('active');
        $('#' + navElement).parent().addClass('active');
    }
});
