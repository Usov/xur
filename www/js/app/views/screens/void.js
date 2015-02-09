define(['widget', 'text!templates/screens/void.html!strip',
        'widgets/voidQuestion', 'widgets/user'
    ],
    function (Widget, template,
              VoidQuestionWidget, UserWidget) {
        var VoidScreen = Widget.extend({
            el: '#screenContainer',
            template: _.template(template),
            initializeWidgets: function () {
                this.widgets = {
                    user: new UserWidget(),
                    question: new VoidQuestionWidget()
                };
            }
        });
        return VoidScreen;
    }
);