define(['widget', 'models/question', "text!templates/widgets/marks.html!strip"],
    function (Widget, QuestionModel, template) {
        var Marks = Widget.extend({
            template: _.template(template),
            el: "#marksContainer",
            initialize: function () {
                //this.model = {};
            },
            afterRender: function () {
                //this.associateModel(this.model, {text: 'text', answer: 'answer', explanations: 'explanations'});
            },
            answerAssociate: function (model) {
                //this.$('[data-model =answer]').html(model.get('answer').main);
                //this.$('[data-model =other]').html(model.get('answer').other.join(','));
            }
        });
        return Marks;
    });