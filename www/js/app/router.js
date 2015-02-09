define(['backbone', 'appState'], function (Backbone, AppStateModel) {
    var Router = Backbone.Router.extend({
        routes: {
            "": "index", // Пустой hash-тэг
            "game": "game",
            "createQuestion": "createQuestion",
            "topAuthors": "topAuthors",
            "topPlayers": "topPlayers",
            "void": "void",
        },
        index: function () {
            console.warn('Route.index');
            AppStateModel.set({screen: 'index'});
        },

        game: function () {
            console.warn('Route.game');
//            AppStateModel.set({screen:'game'});
        },
        createQuestion: function () {
            console.warn('Route.createQuestion');
            AppStateModel.set({screen:'createQuestion'});
        },
        void: function () {
            console.warn('Route.createQuestion');
            AppStateModel.set({screen:'void'});
        },
        topAuthors: function () {
            console.warn('Route.topAutors');
        },
        topPlayers: function () {
            console.warn('Route.topPlayers');
        }
    });

    return new Router();
});

