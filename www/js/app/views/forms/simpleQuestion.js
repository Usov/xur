define(['widget', "text!templates/forms/simpleQuestion.html!strip"],
    function (Widget, template) {
        var CreateQuestion = Widget.extend({
            template: _.template(template),
            el: "#questionFormContainer",
            answerInput: '<input class="answer" type="text" name="answers[]">',
            events: {
                'focus .answer': 'addAnswerInput'
            },
            //initialize: function () {
            //
            //},
            addAnswerInput: function () {
                console.info($('#answerContainer .answer').last().attr('class'));
                if ($('#answerContainer .answer').last().val().length == 0) {
                    console.info('try to add');
                    $('#answerContainer').append(this.answerInput);
                }
            }
        });
        return CreateQuestion;
    });