var Backbone = require('backbone'),
    templates = require('../templates'),
    LoginModel = require('../models/login');

module.exports = Backbone.View.extend({

    el: $('#content'),

    events: {
        'click #btnLogin': 'login',
        'click #btnNewUser': 'newUser',
        'keyup #inpPassword': 'checkKeypress'
    },

    model: new LoginModel(),

    initialize: function(){
        this.template = templates.home;
    },

    render: function(){
        this.$el.html(this.template());
        this.$('input:first').focus();
        return this;
    },

    checkKeypress: function(e){
        if (e.keyCode && e.keyCode  === 13){
            this.login();
        }
    },

    login: function(){
        var inputs = this.$('input');
        var divMessage = this.$('#divMessage');
        var values = {}; // container for POSTed values
        this.$('.has-error').removeClass('has-error');
        for (var i = 0, l = inputs.length; i < l; i++){
            if (inputs[i].value.length === 0){
                divMessage.html('Please enter a ' + inputs[i].name + '.').removeClass('hidden');
                $(inputs[i]).focus().parent().addClass('has-error');
                return;
            } else {
                divMessage.addClass('hidden');
                values[inputs[i].name] = inputs[i].value; // put POST values into container obj
            }
        }
        this.model.set(values); // set model values
        this.model.save(null, {
            success: function(model, response){
                divMessage.addClass('hidden');
                app.router.navigate('users', {trigger: true});
            },
            error: function(model, response){
                divMessage.html('Login failed. Please try again').removeClass('hidden');
            }
        });
    },

    newUser: function(){
        app.router.navigate('newuser', {trigger: true});
    }
});
