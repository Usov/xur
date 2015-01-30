define(['widget', 'text!templates/screens/index.html!strip',
        'widgets/user', 'widgets/navigate', 'widgets/indexTileArea'],
    function (Widget, template, UserWidget, NavigateWidget, TileAreaWidget) {
        var IndexScreen = Widget.extend({
            el: '#screenContainer',
            template: _.template(template),
            events: {
            },
            initializeWidgets: function () {
                this.widgets = {
                    user: new UserWidget(),
                    navigate: new NavigateWidget(),
                    tileArea: new TileAreaWidget()
                }
            },
        });
        return IndexScreen;
    })
;