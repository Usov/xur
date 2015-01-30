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
            console.info('Route.index');
            AppStateModel.set({screen: 'index'});
        },

        game: function () {
            console.info('Route.game');
//            AppStateModel.set({screen:'game'});
        },
        createQuestion: function () {
            console.info('Route.createQuestion');
            AppStateModel.set({screen:'createQuestion'});
        },
        topAuthors: function () {
            console.info('Route.topAutors');
        },
        topPlayers: function () {
            console.info('Route.topPlayers');
        }
    });

    return new Router();
});

