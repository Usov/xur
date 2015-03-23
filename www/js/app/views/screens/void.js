define(['widget', 'text!templates/screens/void.html!strip',
        'widgets/voidQuestion', 'widgets/user', 'widgets/marks',
    ],
    function (Widget, template,
              VoidQuestionWidget, UserWidget, MarksWidget) {
        var VoidScreen = Widget.extend({
            el: '#screenContainer',
            template: _.template(template),
            initializeWidgets: function () {
                this.widgets = {
                    user: new UserWidget(),
                    question: new VoidQuestionWidget(),
                    marks: new MarksWidget(),
                    //timer: new Timer()
                };
            }
        });
        return VoidScreen;
    }
);