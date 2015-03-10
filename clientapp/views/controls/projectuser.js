var Backbone = require('backbone'),
    _ = require('underscore'),
    templates = require('../../templates'),
    ProjectUserModel = require('../../models/projectuser'),
    UserCollection = require('../../models/users');

module.exports = Backbone.View.extend({

    events: {
        'click .btn-success': 'addUser'
    },

    collection: new UserCollection(),

    initialize: function(settings){
        this.template = templates.controls.projectuser;
        this.projectid = settings.projectId;
        this.parentView = settings.parentView;
    },

    render: function(){
        var that = this;
        this.$el.append(that.template({projectid: that.projectid}));
        return this.$el.html();
    },

    currentStep: 0,

    users: [],

    addUser: function(e) {
        var that = this;
        switch(that.currentStep){
            case 0:
                this.collection.fetch({
                    success: function(data){
                        var select = that.$el.find('#selProject-' + that.getProjectId(e));
                        var fragment = document.createDocumentFragment();
                        for (var i = 0, l = data.models.length; i < l; i++){
                            var newOption = document.createElement('option');
                            newOption.value = data.models[i].attributes.id;
                            newOption.innerHTML = data.models[i].attributes.username;
                            fragment.appendChild(newOption);
                        }
                        select.append(fragment);
                        var divControls = that.$el.find('.divControls');
                        divControls.addClass('showing');
                        setTimeout(function(){
                            divControls.addClass('animated');
                        },20);
                        that.currentStep +=1;
                    }
                });
            break;
            case 1:
                var projectId = that.getProjectId(e);
                var user = that.getUser(e, projectId);
                this.model = new ProjectUserModel({
                    userid: user.id,
                    username: user.name,
                    projectid: projectId,
                    credentialtype: that.$el.find('input[name="radCredential"]:checked').val()
                });
                this.model.save(null,{
                    success: function(data){
                        that.addUserLi(data);
                    },
                    error: function(model, response, options){
                        var spnMessage = that.$el.find('.spnMessage').html('Credential exists');
                        setTimeout(function(){
                            spnMessage.html('Add a User');
                        },1500);
                    }
                });
        }
    },

    addUserLi: function(data){
        var newLi = this.parentView.createLi(data,data.attributes.username);
        this.$el.parent().find('.ulUsers').append(newLi);
    },

    getProjectId: function(e){
        var target = e.target;
        if (target.tagName.toLowerCase() !== 'button') { // walk the DOM to get the button
            target = target.parentNode;
        }
        return target.getAttribute('data-id');
    },

    getUser: function(e, projectId){
        var selUser = this.parentView.$el.find('#selProject-' + projectId.toString());
        var user = {
            id: selUser.val(),
            name: selUser[0].selectedOptions[0].text
        };
        return user;
    }
});
