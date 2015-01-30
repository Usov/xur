define(['widget', "text!templates/widgets/indexTileArea.html!strip"],
    function (Widget, template) {
        var TileArea = Widget.extend({
            template: _.template(template),
            el: "#tileContainer",
            initialize: function () {

            },
            afterRender: function () {
                this.msnry = new Masonry('.b-tile-area', {
                    itemSelector: '.b-tile'
                });
            }
        });
        return TileArea;
    });