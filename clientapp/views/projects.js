var Backbone = require('backbone'),
    templates = require('../templates'),
    ProjectModel = require('../models/project'),
    ProjectCollection = require('../models/projects'),
    ProjectUserView = require('./controls/projectuser');

module.exports = Backbone.View.extend({

    el: $('#content'),

    model: ProjectModel,

    events: {
        'change #selField': 'queryValues',
        'change #selValue': 'filterCollection',
        'click #btnReset': 'resetView',
        'click .glyphicon-remove': 'removeProjectUser',
        'click .glyphicon-trash': 'deleteProject'
    },

    collection: new ProjectCollection(),
    projectUsers: new Backbone.Collection(),

    subviews: {},

    initialize: function(){
        var that = this;
        this.template = templates.projects;
        this.collection.fetch({
            success: function(data){
                for (var i = 0, l = data.models.length; i < l; i++){ // set a showing prop on all models
                    data.models[i].showing = true;
                }
                that.fetchProjectsUsers();
            }
        });
    },

    fetchProjectsUsers: function(){
        var that = this;
        $.ajax({
            url: '/api/projectuser',
            success: function(data){
                that.projectUsers.reset(data);
                that.render(); // only render this view after the data is fetched
            }
        });
    },

    render: function(){
        var that = this;
        this.$el.html(this.template({models: this.collection.models}));
        var divProjectUsers = this.$el.find('.divProjectUser');
        var i, l;
        for (i = 0, l = divProjectUsers.length; i < l; i++){
            var subview = new ProjectUserView({
                projectId: divProjectUsers[i].getAttribute('data-id'),
                parentView: this,
                el: divProjectUsers[i]
            });
            subview.render();
            this.subviews[subview.cid] = subview;
        }
        this.collection.each(function(model, index){
            var fragment = document.createDocumentFragment();
            var booAppend = false;
            for (i = 0, l = that.projectUsers.models.length; i < l; i++){
                if (that.projectUsers.models[i].attributes.projectid === model.attributes.id) {
                    booAppend = true;
                    var newLi = that.createLi(that.projectUsers.models[i],that.projectUsers.models[i].attributes.username);
                    fragment.appendChild(newLi);
                }
            }
            if (booAppend) {
                that.$el.find('#ulUsers-' + model.attributes.id).append(fragment).removeClass('hidden');
            }
        });
        switch(this.collection.models.length) {
            case 0:
            break;
            case 1:
                this.$el.find('#spnProjectCount').html(this.collection.models.length.toString() + ' Project Found');
            break;
            default:
                this.$el.find('#spnProjectCount').html(this.collection.models.length.toString() + ' Projects Found');
        }
        return this;
    },

    createLi: function(model, username){
        var newLi = document.createElement('li');
        var newSpan = document.createElement('span');
        switch (model.attributes.credentialtype.toString()){
            case '1':
                newSpan.className = 'glyphicon glyphicon-globe';
                newSpan.title = 'web access';
            break;
            case '2':
                newSpan.className = 'glyphicon glyphicon-lock';
                newSpan.title = 'ssh access';
            break;
            case '3':
                newSpan.className = 'glyphicon glyphicon-open';
                newSpan.title = 'ftp access';
            break;
        }
        newLi.appendChild(newSpan);
        newSpan = document.createElement('span');
        newSpan.innerHTML = username;
        newLi.appendChild(newSpan);

        newSpan = document.createElement('a');
        newSpan.className = 'glyphicon glyphicon-remove';
        newSpan.title = 'remove access';
        newSpan.setAttribute('data-id',model.id);
        newLi.appendChild(newSpan);
        newLi.id = 'liUserAccess-' + model.id;
        return newLi;
    },

    removeProjectUser: function(e){
        var target = e.target;
        $.ajax({
            type: 'delete',
            url: 'api/projectuser',
            data: {
                id: target.getAttribute('data-id')
            },
            success: function(){
                target.parentNode.parentNode.removeChild(target.parentNode);
            }
        });
    },

    deleteProject: function(e){
        var that = this;
        var id = e.target.getAttribute('data-id');
        var liRemove = that.$el.find('#liProject-' + id);
        this.collection.get({id: id}).destroy({
            success: function(){
                liRemove.addClass('fadeOut');
                if (app.isIE9) {
                    liRemove.remove();
                } else {
                    that.$el.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                        liRemove.remove();
                        that.$el.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                    });
                }
            }
        });
    },

    queryValues: function(){
        var selField = this.$('#selField');
        var selValue = this.$('#selValue');
        var optFirst = selField.find('option:first-child');
        if (optFirst.val() === 'null'){
            optFirst.remove();
        }

        selValue.html('');
        this.fieldsIndex = selField[0].selectedIndex;
        var values = this.collection.pluck(selField.val()); // get an array of values for a single attribute in the collection's models
        var arrUnique = function(a) { // get unique values from an array
            return a.reduce(function(p, c) {
                if (p.indexOf(c) < 0) p.push(c);
                return p;
            }, []);
        };
        values = arrUnique(values); // remove duplicate values from the array
        this.arrayValues = values;
        var frag = document.createDocumentFragment();
        var option = document.createElement('option');
        option.value = null;
        option.text = 'Please Select:';
        frag.appendChild(option);
        for (var i = 0, l = values.length; i < l; i++){
            option = document.createElement('option');
            option.value = values[i];
            option.text = values[i];
            frag.appendChild(option);
        }
        selValue.append(frag);
    },

    filterCollection: function(){
        var selField = this.$('#selField');
        var selValue = this.$('#selValue');
        if (selValue[0].firstChild.value === 'null'){
            selValue[0].removeChild(selValue[0].firstChild);
        }
        this.arrayIndex = selValue.find('option:selected')[0].index;
        for (var i = 0, l = this.collection.models.length; i < l; i++){
            if (this.collection.models[i].attributes[selField.val()] !== selValue.val()){
                this.collection.models[i].showing = false;
            } else {
                this.collection.models[i].showing = true;
            }
        }
        this.render();
    },

    resetView: function(){
        this.arrayValues = [];
        this.valuesIndex = null;
        this.fieldsIndex = null;
        this.collection.each(function(model, index){
            model.showing = true;
        });
        this.render();
    },

    arrayValues: [],
    valuesIndex: null,
    fieldsIndex: null
});
