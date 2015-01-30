define(['widget', "text!templates/widgets/navigate.html!strip"],
    function (Widget, template) {
        var NavigateView = Widget.extend({
            template: _.template(template),
            el: "#navigateContainer",
        });
        return NavigateView;
    });