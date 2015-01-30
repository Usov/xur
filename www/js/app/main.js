requirejs.config({
    paths: {
        jquery: '/js/libs/jquery',
        backbone: '/js/libs/backbone',
        underscore: '/js/libs/underscore',
        text: '/js/libs/require-text',

        widgets: '/js/app/views/widgets',
        templates: '/templates/app',
        models: '/js/app/models',
        screens: '/js/app/views/screens',
        forms: '/js/app/views/forms',

        popups: '/js/app/views/popup',


        router: '/js/app/router',
        appState: 'models/appState',
        widget: '/js/app/views/abstract/simpleWidget',
    },
});
require(['router', 'views/app', 'backbone'],
    function (Router, AppView, Backbone) {
        Backbone.history.start();
        var app = new AppView();
    });
