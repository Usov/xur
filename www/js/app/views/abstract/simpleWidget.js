define(['backbone'], function (Backbone) {
    var Widget = Backbone.View.extend({
        /**
         * http://backbonejs.ru/#View-el
         */
        el: '',
        /**
         * Используемая виджетом модель. Может быть JSON или объектом Backbone.Model
         */
        model: {},
        /**
         * http://backbonejs.ru/#View-constructor
         */
        initialize: function () {
        },

        initializeWidgets: function () {
        },
        /**
         * Метод вызывается отрисовки.
         * Разбирает стандартный пустой метод на 3, вызываемые последовательно.
         */
        render: function () {
            this.abstractBeforeRender().selfRender().abstractAfterRender();
            return this;
        },
        /**
         * Метод не желательный для расширения вызываемый до selfRender.
         */
        abstractBeforeRender: function () {
            this.beforeRender();
            return this;
        },
        /**
         * Метод доступный для расширения вызываемый в abstractBeforeRender.
         */
        beforeRender: function () {
        },
        /**
         * Метод собственной отрисовки виджета.
         */
        selfRender: function () {
            var model = this.model instanceof Backbone.Model ? this.model.toJSON() : this.model;
            _.extend(model, {view: this.viewParam});
            $(this.el).html(this.template(model));
            return this;
        },
        /**
         * Метод не желательный для расширения вызываемый после selfRender.
         */
        abstractAfterRender: function () {
            this.afterRender();
            this.initializeWidgets();
            this.renderWidgets();
            return this;
        },
        /**
         * Метод доступный для расширения вызываемый в abstractAfterRender.
         */
        afterRender: function () {
        },

        /**
         * Рендер возвращающий результат работы ввиде HTML элемента.
         */
        returnableRender: function () {
            var model = this.model instanceof Backbone.Model ? this.model.toJSON() : this.model;
            return this.$el.html(this.template(model));
        },
        /**
         * Метод отрисовки виджетов.
         */
        renderWidgets: function () {
            if ('widgets' in this) {
                for (var widget in this.widgets) {
                    this.widgets[widget].render();
                }
            }
        },

        associateModel: function (model, attributes) {
            var _this = this
            var obj = {};
            if (_.isArray(attributes)) {
                for (var i = 0; i < attributes.length; i++) {
                    obj[attributes[i]] = attributes[i];
                }
            } else {
                obj = attributes;
            }


            var eventObj = {};

            for (var key in obj) {
                var func = function (k, o, m) {
                    _this.listenTo(m, 'change:' + k, function () {
                        var html;
                        console.warn(k + 'Associate', k + 'Associate' in this);
                        if (k + 'Associate' in this) {
                            this[k + 'Associate'](m);
                        } else {
                            html = m.get(k);
                            this.$('[data-model =' + o[k] + ']').html(html);
                        }

                    })
                }(key, obj, model);
            }
        }
    });

    return Widget;
});
