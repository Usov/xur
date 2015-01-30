define(['backbone', 'models/notification', 'models/stat'],
    function (Backbone, NotificationModel, StatModel) {
        var NotificationCollection = Backbone.Collection.extend({
            model: NotificationModel,
            notificationCount: 0,
            setByType: function (params) {
                console.info('notification.setByType', params)
                switch (params.method) {
                    case 'gameNotification':
                        this.setGameNotification(params)
                        break;
                    case 'userInfo':
                        this.setUserInfo(params);
                        break;
                    case 'newAchievement':
                        this.setNewAchievement(params);
                        break;
                }
            },
            setGameNotification: function (params) {
                var modelHash = {};
                modelHash.time = Date.now();
                modelHash.type = 'game';
                modelHash.data = new StatModel(params.statBetweenUsers);

                var notificationExist = false;

                var currentGame = modelHash.data.get('currentGame');
                var gameStatus = currentGame.status.value;

                if (gameStatus == 'userTurn') {
                    if (modelHash.data.get('currentGame').rounds[0].serverPlayer !== undefined) {
                        if (modelHash.data.get('currentGame').rounds[0].serverPlayer.id !== Application.models.user.get('id')) {
                            notificationExist = true;
                        }
                    }
                    if (currentGame.rounds[currentGame.rounds.length-1].results !== undefined) {
                        notificationExist = true;
                    }
                } else if (gameStatus == 'ended') {
                    notificationExist = true;
                }

                if (notificationExist) {
                    ++this.notificationCount;
                    console.warn('game notification, check it', modelHash.data);
                    this.add(modelHash);
                }
            },
            setUserInfo: function (params) {
                // Попап полной версии
                var proVersionPrevState = Application.models.user.checkProVersion();
                console.log('Previous state proVersion: ',proVersionPrevState);
                if (proVersionPrevState !== (params.info.fullVersion || params.info.trialVersion)) {
                    if (params.info.fullVersion || params.info.trialVersion) {
                        Application.collections.popups.add({
                            type: 'text',
                            params: {
                                header: 'Полная версия приобретена!',
                                text: 'Теперь вы можете узнать полную статистику по Вашим играм, играм друзей и рейтинги всех игроков.',
                                list: null,
                                cursiv: null
                            }
                        });
                        // Скрываем кнопку "Купить про версию"
                        $('#proVersionButton').hide();
                    } else {
                        Application.collections.popups.add({
                            type: 'text',
                            params: {
                                header: 'Внимание!',
                                text: 'Функционал PRO-версии истёк',
                                list: null,
                                cursiv: null
                            }
                        });
                        // Показываем кнопку
                        $('#proVersionButton').show();
                    }
                }

                //Авторизации нет ищем в storage
                console.group("notification.setUserInfo log");
                var previousBalanceValue = Application.models.user.get('balance') ? Application.methods.getCookie('balance') : Application.methods.getCookie('balance');
                if (params.info.balance !== previousBalanceValue) {
                    this.notificationCount++;
                    var modelHash = {};
                    modelHash.time = Date.now();
                    modelHash.type = 'balance';
                    modelHash.data = {difference: params.info.balance - parseInt(previousBalanceValue)}
                    console.warn('notification.setUserInfo.balance.diff', modelHash.data.difference, '=', params.info.balance, '-', parseInt(previousBalanceValue));
                    if (modelHash.data.difference > 0) {
                        console.warn('balance notification, check it', modelHash.data)
                        Application.methods.play('coins');
                        this.add(modelHash);
                    }
                }

                if (params.info.rating !== Application.models.user.get('rating')) {
                    this.notificationCount++;
                    var modelHash = {};
                    modelHash.time = Date.now();
                    modelHash.type = 'rating';
                    modelHash.data = {
                        ratingAfter: params.info.rating,
                        ratingBefore: Application.models.user.get('rating')
                    };
                    console.warn('notification.setUserInfo.level.diff', modelHash.data.difference, '=', params.info.balance, '-', parseInt(previousBalanceValue));
                    if (Application.methods.levelForRating(params.info.rating) != Application.methods.levelForRating(Application.models.user.get('rating'))) {
                        console.warn('level notification, check it', modelHash);
                        this.add(modelHash);
                        Application.collections.popups.add({
                            type: 'newRank',
                            params: {
                                newRating: modelHash.data.ratingAfter
                            }
                        });
                    }
                }



                console.groupEnd();

            },
            setNewAchievement: function (params) {
                this.notificationCount++;
                var modelHash = {};
                modelHash.time = Date.now();
                modelHash.type = 'newAchievement';
                modelHash.data = params.achievement;
                console.warn('achiev notification, check it', modelHash);
                Application.methods.play('achievement');
                this.add(modelHash);
            }
        });

        return NotificationCollection;
    });
