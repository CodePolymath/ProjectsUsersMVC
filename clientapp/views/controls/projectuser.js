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
                        _.defer(function(){
                            divControls.addClass('animated');
                        });
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
                    }
                });
        }
    },

    addUserLi: function(data){
        var newLi = document.createElement('li');
        var newSpan = document.createElement('span');
        newSpan.innerHTML = data.attributes.username;
        newLi.appendChild(newSpan);
        newSpan = document.createElement('span');
            switch (data.attributes.credentialtype.toString()){
            case '1':
                newSpan.innerHTML = 'web';
            break;
            case '2':
                newSpan.innerHTML = 'ssh';
            break;
            case '3':
                newSpan.innerHTML = 'ftp';
            break;
        }
        newLi.appendChild(newSpan);

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
