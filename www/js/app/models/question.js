define(['backbone', 'gate'], function (Backbone, Gate) {
    var QuestionModel = Backbone.Model.extend({
        getVoidQuestion: function () {
            this.listenTo(Gate, 'getRandomQuestion', function (attributes) {
                this.set(attributes);
                console.warn('qm', this);
            })
            Gate.getRandomQuestion();
        }
    });

    return QuestionModel;
});

