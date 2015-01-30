define(['backbone', 'models/achievement'], function (Backbone, AchievementModel) {
    var AchievementCollection = Backbone.Collection.extend({
        model: AchievementModel
    });

    return AchievementCollection;
});

