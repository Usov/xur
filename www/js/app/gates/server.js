define(['backbone', 'gates/emulation'],
    function (Backbone, Data) {
        var ServerGate = _.extend({
            getRandomQuestion: function () {
                this.trigger('getRandomQuestion', Data.question);
            }

        }, Backbone.Events);


        return ServerGate;
    }
);