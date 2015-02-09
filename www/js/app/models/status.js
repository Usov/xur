define(['backbone'], function (Backbone) {
    var Status = _.extend({
        events: {
            auth: {status: 0},
            social: {status: 0},
            images: {status: 0},
        },
        ready: function (triggerName) {
            if (triggerName in this.events) {
                this.events[triggerName].status = 1;
                this.trigger(triggerName + 'Ready');
                this.checkAppReady();
            } else {
                console.warn('status.ready triggerName doesnt exist:', triggerName);
            }
        },
        onReady: function (event, method) {
            console.warn('check ', event, ' is ready?', this.events[event].status == 1);
            if (event in this.events && this.events[event].status == 1) {
                method();
            } else {
                Status.on(event+'Ready', method);
            }
        },
        checkAppReady: function () {
            var countReadyevents = 0;
            for (var event in this.events) {
                if (this.events[event].status == 1) {
                    countReadyevents++;
                }
            }
            if (Object.keys(this.events).length == countReadyevents) {
                console.warn('status.appReady')
                this.trigger('appReady');
            }
        }

    }, Backbone.Events)
    return Status;
});
