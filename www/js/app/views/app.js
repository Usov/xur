define(['backbone', 'appState',
        'screens/index', 'screens/createQuestion',
    ],
    function (Backbone, AppStateModel, IndexScreen, CreateQuestionScreen) {

        var AppView = Backbone.View.extend({
            initialize: function () {
                this.screens = {
                    'index': IndexScreen,
                    'createQuestion': CreateQuestionScreen
                };
                this.model = AppStateModel;

                this.model.on('change:screen', this.setScreen, this);
                this.model.trigger('change:screen');
                console.log(this.model);
            },
            setScreen: function () {
                console.info('AppWiew.setScreen', this.model)
                this.activeScreen = new this.screens[this.model.get('screen')];
                this.activeScreen.render();
            }
        });

        return AppView;
    });