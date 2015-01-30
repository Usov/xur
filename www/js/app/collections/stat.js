define(['backbone', 'models/stat'], function (Backbone, StatModel) {
    var StatCollection = Backbone.Collection.extend({
        model: StatModel,
        //Стандартный set нам не подходит.
        //Пишем свой который в зависимости от id добавляет или изменяет модель в коллекцие
        setByOpponentId: function (array) {
            for (var i = 0; i < array.length; i++) {
                var model = this.inCollection(array[i]);
                if (model) {
                    model.set(array[i])
                }
                else {
                    this.add(array[i])
                }
            }
            this.trigger('setByOpponentId')
        },
        //Новый get соответственно.
        getByOpponentId: function (id) {
            var result = false
            this.each(function (model) {
                if (model.get('opponent').id === id) {
                    result = model;
                }
            });
            return result;
        },
        inCollection: function (object) {
            var result = false;
            this.each(function (model) {
                if (model.get('opponent').id == object.opponent.id) {
                    result = model;
                }
            });
            return result;

        }
    });

    return StatCollection;
});
