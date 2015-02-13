define(['backbone', 'gate'], function (Backbone, Gate) {
    var QuestionModel = Backbone.Model.extend({
        initialize: function () {
            this.set({answer: 'asdasd', text: 'Это текст по умолчанию'});
        },
        getVoidQuestion: function () {
            this.listenTo(Gate, 'getRandomQuestion', function (attributes) {
                this.set(attributes);
            });
            Gate.getRandomQuestion();
        }
    });

    return QuestionModel;
});

