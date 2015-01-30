define(['backbone', 'models/opponent'], function (Backbone, PlayerStatModel) {
    var PlayersStatCollection = Backbone.Collection.extend({
        model: PlayerStatModel
    });

    return PlayersStatCollection;
});
