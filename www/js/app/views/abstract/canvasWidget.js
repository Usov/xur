define(['backbone'],
    function (Backbone) {
        var CanvasWidget = Backbone.View.extend({
            widgets: [],
            el: '',
            model: {},
            stop: false,
            initialize: function (params) {
                this.afterInitialize()
                this.render();
            },
            afterInitialize: function () {
            },
            initializeWidgets: function () {
            },
            /**
             * Метод вызывается автоматически в Backbone.view после initialize.
             * После обновления данных и отрисовки вызывает сам себя через this.requestAnimFrame
             */
            requestAnimFrame: function (callback, element) {
                requestAnimFrame(callback, element);
            },
            /**
             * Метод вызывается автоматически в Backbone.view после initialize.
             * После обновления данных и отрисовки вызывает сам себя через this.requestAnimFrame
             */
            render: function () {
                var _this = this;

                //Сложная не ясная конструкция - которую я украл из интернета.
                this.update().draw().requestAnimFrame(function () {
                    if (_this.stop !== true) {
                        //console.log('recursiveRender');
                        _this.render();
                    } else {
                        window.clearAnimation(requestAnimFrame);
                        _this.endRender();
                    }
                });
            },
            endRender: function () {

            },
            /**
             * Метод обновления данных виджета
             * Всегда должен возвращать this или делать в конце
             * CanvasWidget.prototype.update.apply(this, [newAttributes, options]);
             */
            update: function () {
                return this;
            },
            /**
             * Метод отрисовки данных виджета в canvas
             * Всегда должен возвращать this или делать в конце
             * CanvasWidget.prototype.draw.apply(this, [newAttributes, options]);
             */
            draw: function () {
                return this;
            },
            /**
             *  Сборка мусора. Очищаем this.listenTo и this.events
             */
            clearEvents: function () {
                this.stopListening();
                this.undelegateEvents();
            }


        });

        return CanvasWidget;
    })
;
