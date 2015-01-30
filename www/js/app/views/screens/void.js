define(['widget', 'text!templates/screens/void.html!strip', 'widgets/question', 'widgets/user'],
    function (Widget, template,
              QuestionWidget, UserWidget) {
        var VoidScreen = Widget.extend({
            el: '#screenContainer',
            template: _.template(template),
            initializeWidgets: function () {
                this.widgets = {
                    user: new UserWidget(),
                    question: new QuestionWidget(),
                }
            },
        });
        return VoidScreen;
    }
);