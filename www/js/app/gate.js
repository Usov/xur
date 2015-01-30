var sock = new SockJS('https://social.wordbyword.me:8081/', null, {debug: true, devel: true});
//var sock = new SockJS('https://test.social.wordbyword.me:8081/', null, {debug: true, devel: true});
//var sock = new SockJS('https://10.2.0.68:8081/', null, {debug: true, devel: true});

var Gate = (function () {
    return {
        init: function () {
            var _this = this;

            VK.init(function () {
                //console.info('vk init success');
            }, function () {
                //console.log('vk init fail');
            }, '5.24');
        },
        /**
         * Метод  запращивающий данные VK о пользователе, и отправляющие их на сервер для авторизации
         * Метод Gate.parseMessage выбросит собитие 'auth' с параметром {user}.
         */
        auth: function () {
            VK.api("users.get", {fields: ['photo_100', 'photo_200'], test_mode: "1"}, function (data) {
                console.info('vk get userInfo:', data.response[0]);
                var a = {
                    'method': 'auth', 'authType': '1', 'authData': {
                        'socialId': {'vk': data.response[0].id.toString()},
                        'screenSize': {'w': 826, 'h': 690},
                        'avatarUrl': data.response[0].photo_100,
                        'avatarBigUrl': data.response[0].photo_200,
                        'netType': 0,
                        'appVersion': '3.1.9',
                        'appName': 'WBWSocial_vk',
                        'playerName': data.response[0].first_name + " " + data.response[0].last_name,
                        'udid': data.response[0].id.toString()
                    }
                };
                sock.send(JSON.stringify(a) + '\r\n');
            });
        },

        /**
         * Получает всех друзей из ВК
         */
        getFriends: function () {
            var _this = this;
            VK.api('friends.get', {
                count: 200
            }, function (data) {
                _this.filterFriends(data.response.items)
            });
        },

        /**
         * Посылает на сервер все ВК-ID, в ответ приходит отсортированный список (играет/не играет/уже прилашён)
         * @param vkIDs
         */
        filterFriends: function (vkIDs) {
            var _this = this;
            $.post('/api/vk/get-friends', {
                userId: Application.models.user.get('socialId').vk,
                friends: vkIDs
            }, function (friends) {
                console.info('friends',friends);
                if (friends.state == 'success') {
                    _this.getVkUserInfo(friends.data)
                }
            }, 'json');

        },

        getVkUserInfo: function (friends) {
            var _this = this;

            VK.api('users.get', {
                user_ids: friends.absentFriends.join(),
                fields: 'photo_50'
            }, function (data) {
                friends.absentFriends = data.response;
                console.info('vk getVkUserInfo:', data);
                _this.trigger('getFriends', friends);
            });

            //TODO: раскоментировать, когда будет нужно определять, кого уже пригласили
            //VK.api('users.get', {
            //    user_ids:friends.invitedFriends.join(),
            //    fields:'photo_50'
            //}, function (data) {
            //    friends.invitedFriends = data.response;
            //
            //    _this.trigger('getFriends',friends);
            //});
        },

        /**
         * Показывает окно VK для отправки приглашения пользователю
         * @param uid
         */
        showRequestBox: function (uid) {
            VK.addCallback('onRequestSuccess', function () {
                Gate.socialInviteFriend(uid);
                console.info("Gate.showRequestBox.success " + uid)
            });
            VK.callMethod('showRequestBox', uid, Application.params.inviteText, 'test_request_key');
        },

        inviteAllFriends: function () {
            VK.callMethod("showInviteBox");
        },

        /**
         * Метод отсылает на сервер uid пользователя которого пригласили в игру
         * @param uid ID VK
         */
        socialInviteFriend: function (uid) {
            $.post('/api/vk/send-invite', {
                userId: Application.models.user.get('socialId').vk,
                receiverId: uid
            }, function (data) {
                console.info('gate.socialInviteFriend', data)
                if (data.state == 'success') {
                    Gate.trigger('inviteSuccess', uid)
                }
            }, 'json');
        },

        /**
         * Метод  запращивающий список игроков и самого игрока отсортированному по рейтингу.
         * Gate.parseMessage после получения ответа от сервера выбросит собитие 'getUserGamesHistory'
         * с параметром [{stat},{stat}...].
         */
        getUserGamesHistory: function () {
            sock.send('{"method" : "getUserGamesHistory"}' + '\r\n')
        },
        /**
         * Метод запращивающий список игроков и самого игрока отсортированному по рейтингу.
         * Gate.parseMessage после получения ответа от сервера выбросит собитие 'getTopUsers'
         * с параметром [{player},{player}...].
         */
        getTopUsers: function (offset) {
            offset = offset || 0;
            sock.send(JSON.stringify({
                method: "getTopUsers",
                offset: offset
            }) + '\r\n')
        },
        /**
         * Метод  запращивающий список друзей и самого игрока отсортированному по рейтингу.
         * @param {Array} массив объектов {socialId:{}}
         * Gate.parseMessage после получения ответа от сервера выбросит собитие 'getTopFriends'
         * с параметром [{player},{player}...].
         */
        getTopFriends: function (array) {
            if (array === undefined) {
                array = []
            }
            array.push({vk: Application.models.user.get('socialId').vk});
            sock.send('{"method" : "getTopFriends" , "friends":' + JSON.stringify(array) + '}\r\n')
        },
        /**
         * Метод запращивающий список достижений пользователя.
         * Gate.parseMessage после получения ответа от сервера выбросит собитие 'getAchievements'
         * с параметром [{achievement},{achievement}...].
         */
        getAchievements: function () {
            sock.send('{"method" : "getAchievements"}' + '\r\n')
        },
        /**
         * Метод сообщающий серверу об использовании пользователем подсказки.
         * Gate.parseMessage после получения ответа от сервера выбросит собитие 'getTip'.
         */
        getTip: function () {
            sock.send('{"method" : "getTip" , "count":1}' + '\r\n')
        },
        getRound: function (round) {
            sock.send('{"method" : "getRound","game" : "' + round + '"}' + '\r\n');
        },

        createRandGame: function () {
            sock.send('{ "method" : "createRandGame","gameData": {}}' + '\r\n');
        },
        createRound: function (obj) {
            sock.send(JSON.stringify({
                "method": "createRound",
                "socialId": obj.socialId,
                "dbField": true
            }) + '\r\n');
        },
        joinGame: function (round) {
            sock.send('{ "method" : "joinGame","game":"' + round + '",  "decision" : 1}' + '\r\n');
        },
        sendResults: function (round, result) {
            sock.send(JSON.stringify({"method": "sendResults", "game": round, "results": result}) + '\r\n');
        },
        sendEmptyResults: function (round, result) {
            sock.send(JSON.stringify({
                "method": "sendResults",
                "game": round,
                "results": {usedWords: [], scores: 0, notExistsWords: []}
            }) + '\r\n');
        },
        sendRobotResults: function (round, result) {
            sock.send(JSON.stringify({
                "method": "sendResults",
                "game": round,
                "results": result,
                "robotResults": []
            }) + '\r\n');
        },
        resetUserRatingForCurrentGame: function (opponentId) {
            sock.send(JSON.stringify({
                "method": "resetUserRatingForCurrentGame",
                "opponent": opponentId
            }) + '\r\n');
        },
        /**
         * Метод  запращивающий детальную информацию о пользователе.
         * @param {Object} или {String} объект с параметрами {соц.сеть: значение , ...} или строка 'id в приложении'
         * Gate.parseMessage после получения ответа от сервера выбросит собитие 'findUserById' c
         * параметром {player}
         */
        findUserById: function (id) {
            if (typeof(id) == 'object') {
                sock.send('{"method" : "findUserById","socialId" : ' + JSON.stringify(id) + '}' + '\r\n');
            } else {
                sock.send('{"method" : "findUserById","id" : "' + id + '"}' + '\r\n');
            }
        },
        /**
         * Метод  запращивающий список пользователей по имени.
         * @param {String} имя пользователя
         * Gate.parseMessage после получения ответа от сервера выбросит собитие 'findUsersByName' c
         * параметром {player}
         */
        findUsersByName: function (name) {
            sock.send('{"method":"findUsersByName", "playerName":"' + name + '", "offset":0, "limit":10}' + '\r\n');
        },

        getProducts: function () {
            $.ajax({
                url: "/api/vk/get-all-products",
                type: 'GET'
            }).done(function (e) {
                var data = JSON.parse(e);
                console.info('getProducts', data);
                Gate.trigger('getProducts', data);
            });
        },
        buyProduct: function (_id) {
            var params = {
                type: 'item',
                item: _id
            };
            VK.callMethod('showOrderBox', params);

        },
        clearStat: function (array) {
            sock.send(JSON.stringify({
                "method": "clearStat",
                "usersToRemove": array
            }) + '\r\n');
        },
        sendReminder: function (receiverId) {
            $.post('/api/vk/send-notice', {
                type: 'vk',
                action: 'reminder',
                userId: Application.models.user.get('id'),
                receiverId: receiverId
            }, function (response) {
                console.log('response', response);
                if (response.state == 'success') {
                    Gate.trigger('sendReminder')
                }
            }, 'json');
        },

        /**
         * Метод вызывающийся на sock.onmessage
         * @params {Object} message объект пришедший с сервера
         * Выбрасывает событие соответствующие  message.method с параметрами  message
         */
        parseMessage: function (message) {
            var a = message.method;
            Gate.trigger(a, message);
        },

        /**
         * Объект для работы с VK.storage
         */
        storage: {
            /**
             * https://vk.com/dev/storage.set
             */
            set: function (key, value) {
                VK.api("storage.set", {key: key, value: value, test_mode: "1"}, function (data) {
                    console.info('storage.set.' + key, data);
                    Gate.trigger('storage.set.' + key, data)

                    //cd(window[1]); VK.api('storage.set',{key:'tutorialStatus', value:'', test_mode:'1'})
                });
            },
            /**
             * https://vk.com/dev/storage.get
             */
            get: function (key) {
                VK.api("storage.get", {key: key, test_mode: "1"}, function (data) {
                    console.info('storage.get.' + key, data);
                    Gate.trigger('storage.get.' + key, data);
                });
            },
            /**
             * https://vk.com/dev/storage.getKeys
             */
            getKeys: function () {
            }

        }

    }
}());
_.extend(Gate, Backbone.Events);


