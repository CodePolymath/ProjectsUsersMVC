var Backbone = require('backbone'),
    templates = require('../templates'),
    UserModel = require('../models/user'),
    UserCollection = require('../models/users');

module.exports = Backbone.View.extend({

    el: $('#content'),

    model: UserModel,

    events: {
        'change #selField': 'queryValues',
        'change #selValue': 'filterCollection',
        'click #btnReset': 'resetView',
        'click .glyphicon-trash': 'deleteUser'
    },

    collection: new UserCollection(),

    initialize: function(){
        var self = this;
        this.template = templates.users;
        this.collection.fetch({
            success: function(data){
                for (var i = 0, l = data.models.length; i < l; i++){ // set a showing prop on all models
                    data.models[i].showing = true;
                }
                self.render(); // only render this view after the data is fetched
            }
        });
    },

    render: function(){
        this.$el.html(this.template({models: this.collection.models}));
        switch(this.collection.models.length) {
            case 0:
            break;
            case 1:
                this.$el.find('#spnUserCount').html(this.collection.models.length.toString() + ' User Found');
            break;
            default:
                this.$el.find('#spnUserCount').html(this.collection.models.length.toString() + ' Users Found');
        }
        if (this.arrayValues.length > 0){ // persisting select options after view is re-rendered
            var frag = document.createDocumentFragment();
            for (var i = 0, l = this.arrayValues.length; i < l; i++){
                var option = document.createElement('option');
                option.value = this.arrayValues[i];
                option.text = this.arrayValues[i];
                if (i === this.arrayIndex){
                    option.selected = true;
                }
                frag.appendChild(option);
            }
            this.$('#selValue').html('').append(frag);
            var selFields = this.$('#selField');
            selFields.find(':first').remove();
            selFields[0].selectedIndex = this.fieldsIndex;

        }
        return this;
    },

    deleteUser: function(e){
        var that = this;
        var userid = e.target.getAttribute('data-id');
        var liRemove = that.$el.find('#liUser-' + userid);
        this.collection.get({id:userid}).destroy({
            success: function(){
                if (app.isIE9) {
                    liRemove.remove();
                } else {
                    liRemove.addClass('fadeOut');
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
