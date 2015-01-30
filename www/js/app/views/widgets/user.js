define(['widget', "text!templates/widgets/user.html!strip"],
    function (Widget, template) {
        var UserView = Widget.extend({
            template: _.template(template),
            el: "#userContainer",
//            events: {
//                "click #userButton": "showUserInfo",
//            },
            initialize: function () {
//                this.model = Application.models.user;
            },
            showUserInfo: function () {
//                Application.models.appState.screenObj.showUserInfo();
            }
        });
        return UserView;
    });