define(['widget', 'models/question', "text!templates/widgets/voidQuestion.html!strip"],
    function (Widget, QuestionModel, template) {
        var VoidQuestion = Widget.extend({
            template: _.template(template),
            el: "#voidQuestionContainer",
            initialize: function () {
                this.model = new QuestionModel;
                //this.model.getVoidQuestion();
                //console.warn(this.model.attributes);
            },
            afterRender: function () {
                this.associateModel(this.model, {text: 'text', answer: 'answer', explanations: 'explanations'});
                //setTimeout(this.model.getVoidQuestion, 3000);
                this.model.getVoidQuestion();
            },
            answerAttributePreparing: function (attribute) {
                console.warn('answerAttributePreparing')
                return attribute.main;
            },
        });
        return VoidQuestion;
    });