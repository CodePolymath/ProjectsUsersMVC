var Backbone = require('backbone'),
    Router = require('./router');

app = {

    router: new Router(),

    init: function (){
        Backbone.$ = $; // backbone needs to know where jQuery is
        Backbone.history.start({silent: false});
    },

    renderView: function(newView){
        newView.render();
    }

};

$(function(){
    app.init(); // start the app on document.ready
});
