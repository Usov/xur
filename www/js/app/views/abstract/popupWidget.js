define(['backbone'], function (Backbone) {
    var PopupWidget = Backbone.View.extend({
        originalEvents: {
            'click #close': 'closePopup'
        },
        tagName: 'div',
        additionalEvents: {},
        closePopup: function () {
            console.warn('we gonna remove popup', this.modelId);
            Application.collections.popups.remove(this.modelId);
        },
        events: function () {
            return _.extend({}, this.originalEvents, this.additionalEvents);
        },
        initialize: function () {
        },

        /**
         * Метод вызывается отрисовки.
         * Разбирает стандартный пустой метод на 3, вызываемые последовательно.
         */
        render: function () {
            this.beforeRender().selfRender().afterRender();
            //TODO разобраться с TypeError: (intermediate value).callback.call is not a function          backbone.js (строка 208, столбец 37)
            return this;
        },
        /**
         * Метод собственной отрисовки виджета.
         */
        selfRender: function () {
            var model = this.model instanceof Backbone.Model ? this.model.toJSON() : this.model;
            //console.warn('we gonna render popup', this.template(model))
            $('#popup').append(this.$el.html(this.template(model)));
            return this;
        },
        /**
         *  Метод вызываемый после selfRender
         */
        afterRender: function () {
        },
        /**
         * Метод вызываемый до selfRender.
         * Всегда должен возвращать this или делать в конце
         * Widget.prototype.beforeRender.apply(this, [newAttributes, options]);
         */
        beforeRender: function () {
            return this;
        },
        render: function () {
            this.beforeRender().selfRender().afterRender();
        }
    });
    return PopupWidget;
});