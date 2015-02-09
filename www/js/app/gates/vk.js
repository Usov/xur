define(['gates/server', 'status'],
    function (ServerGate, Status) {
        var VkGate = _.extend(ServerGate, {
            init: function () {
                var _this = this;
                VK.init(function () {
                    console.warn('vk init success');
                    Status.ready('social');
                }, function () {
                    console.warn('vk init fail');
                }, '5.24');
            }
        });
        return VkGate;
    }
);