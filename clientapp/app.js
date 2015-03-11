var Backbone = require('backbone'),
    Router = require('./router');

app = {

    router: new Router(),

    init: function (){
        Backbone.$ = $; // backbone needs to know where jQuery is

        var s = document.createElement('p').style; // feature detection is better than browser sniffing
        app.useTransitions = 'transition' in s ||
            'WebkitTransition' in s ||
            'MozTransition' in s ||
            'msTransition' in s ||
            'OTransition' in s;

        this.currentView = null;

        Backbone.history.start({silent: false});
    },

    renderView: function(newView){
        var previousView;
        if (app.currentView !== null) {
            previousView = app.currentView;
        }
        app.currentView = newView;
        if (!app.contentContainer) {
            app.contentContainer = $('#content');
        }
        app.contentContainer.html(newView.render());
        app.contentContainer.find('input:first').focus();

        if (previousView) {
            previousView.remove();
        }
    }
};

$(function(){
    app.init(); // start the app on document.ready
});
