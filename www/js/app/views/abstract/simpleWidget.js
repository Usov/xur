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
            var obj = {};
            if (_.isArray(attributes)) {
                for (var i = 0; i < attributes.length; i++) {
                    obj[attributes[i]] = attributes[i];
                }
            } else {
                obj = attributes;
            }


            var eventObj={};

            for (var key in obj) {
                console.warn(key);

                var func =function (m, v, o) {
                        var _key= _.clone(key);
                        console.warn('model was changed', _key, m, v, o);
                        //var html;
                        //if (key + 'AttrPreparing' in this) {
                        //    html = this[key + 'AttrPreparing'](model.get(key));
                        //} else {
                        //    html = model.get(key);
                        //}
                        ////console.warn('[data-model =' + obj[key] + ']', $('[data-model =' + obj[key] + ']').html());
                        //this.$('[data-model =' + obj[key] + ']').html(html);
                    };
                this.listenTo(model, 'change:' + key, func);


                //this.listenTo(model, 'change:' + key, function (m, v, o) {
                //    var _key= _.clone(key);
                //    console.warn('model was changed', _key, m, v, o);
                //    var html;
                //    if (key + 'AttrPreparing' in this) {
                //        html = this[key + 'AttrPreparing'](model.get(key));
                //    } else {
                //        html = model.get(key);
                //    }
                //    //console.warn('[data-model =' + obj[key] + ']', $('[data-model =' + obj[key] + ']').html());
                //    this.$('[data-model =' + obj[key] + ']').html(html);
                //});
                //console.warn('key2',key);
                //console.warn('model', model._events)
            }


        }
    });

    return Widget;
});
