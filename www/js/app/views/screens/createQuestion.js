define(['widget', 'text!templates/screens/createQuestion.html!strip', 'forms/simpleQuestion', 'widgets/user'],
    function (Widget, template,
              SimpleQuestionForm, UserWidget) {
        var CreateQuestionScreen = Widget.extend({
            el: '#screenContainer',
            template: _.template(template),
            events: {
                '#chooseQuestionType': 'changeQuestionType'
            },
            initializeWidgets: function () {
                this.widgets = {
                    user: new UserWidget(),
                    simple: new SimpleQuestionForm(),
                }
                this.formTypes = {
                    //simple: new SimpleQuestionForm(),
//                    blitz: new NavigateWidget(),
//                    tileArea: new TileAreaWidget()
                };
            },
            changeQuestionType: function (event) {
                console.log(event)
//                this.form.html(this.formTypes);
            }
        });
        return CreateQuestionScreen;
    }
);