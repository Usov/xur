define(['backbone', 'models/popup'], function (Backbone, PopupModel) {
    var PopupCollection = Backbone.Collection.extend({
        model: PopupModel
    });

    return PopupCollection;
});
