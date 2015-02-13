define(['widget', 'models/question', "text!templates/widgets/voidQuestion.html!strip"],
    function (Widget, QuestionModel, template) {
        var VoidQuestion = Widget.extend({
            template: _.template(template),
            el: "#voidQuestionContainer",
            initialize: function () {
                this.model = new QuestionModel;
                //this.model.getVoidQuestion();
            },
            afterRender: function () {
                this.associateModel(this.model, {text: 'text', answer: 'answer', explanations: 'explanations'});
                this.model.getVoidQuestion();
            },
            answerAssociate: function (model) {
                this.$('[data-model =answer]').html(model.get('answer').main);
                this.$('[data-model =other]').html(model.get('answer').other.join(','));
            },
        });
        return VoidQuestion;
    });