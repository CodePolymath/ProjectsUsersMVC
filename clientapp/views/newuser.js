var Backbone = require('backbone'),
    templates = require('../templates'),
    UserModel = require('../models/user');

module.exports = Backbone.View.extend({

    el: $('#content'),

    events: {
        'click #btnCreate': 'createUser',
        'blur #inpUserName': 'checkUserExists',
        'keyup input[type="text"]': 'checkKeypress'
    },

    model: new UserModel(),

    initialize: function(){
        this.template = templates.newuser;
    },

    render: function(){
        this.$el.html(this.template());
        this.$el.find('input:first').focus();
        return this;
    },

    checkKeypress: function(e){
        if (e.keyCode && e.keyCode  === 13){
            this.createUser();
        }
    },

    checkUserExists: function(){
        var userName = this.$('#inpUserName');
        var strUserName = userName.val();
        var that = this;
        var divMessage;
        $.ajax({
            url: '/api/checkuser?username=' + encodeURIComponent(strUserName),
            success: function (data){
                if (data.length > 0) {
                    divMessage = that.$('#divMessage').removeClass('hidden');
                    userName.parent().addClass('has-error');
                    divMessage.html('That username already exists. Please enter a new username');
                    document.getElementById('btnCreate').disabled = 'true';
                } else {
                    divMessage = that.$('#divMessage').addClass('hidden');
                    userName.parent().removeClass('has-error');
                    document.getElementById('btnCreate').removeAttribute('disabled');
                }
            }
        });
    },

    createUser: function(){
        var inputs = this.$('input');
        var values = {}; // container for POSTed values
        this.$('.has-error').removeClass('has-error');
        var divMessage = this.$('#divMessage').addClass('hidden');
        for (var i = 0, l = inputs.length; i < l; i++) {
            if (inputs[i].value.length === 0 && inputs[i].type !== 'radio'){
                if (inputs[i].name  === 'email' || inputs[i].name === 'age') {
                    divMessage.html('Please enter an ' + inputs[i].name + ' to continue.').removeClass('hidden'); // proper Engrish is a must
                } else {
                    divMessage.html('Please enter a ' + inputs[i].name + ' to continue.').removeClass('hidden');
                }

                $(inputs[i]).focus().parent().addClass('has-error');
                return;
            } else {
                values[inputs[i].name] = inputs[i].value; // put POST values into container obj
            }
        }
        if (document.getElementById('radFemale').checked){
            values.gender = 'F';
        } else {
            values.gender = 'M';
        }
        this.model.set(values); // correct way to set model values

        this.model.save(null, {
            success: function(){
                divMessage.html('New User successfully created.').removeClass('hidden');
                for (var i = 0, l = inputs.length; i < l; i++) {
                    inputs[i].value = ''; // reset the input fields
                }
            },
            error: function(){
                divMessage.html('There was an error creating this new user. Please try again').removeClass('hidden');
            }
        });
    }
});
