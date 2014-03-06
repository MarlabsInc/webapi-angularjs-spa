app.factory('resourceMngrSvc', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var User = $resource("/api/Account/", null, { register: { method: 'post' }, login: { method: 'post' }, logOff: { method: 'GET' } });

    return {
        login: function (userLogin) {
            return User.login(userLogin).$promise;
        },
        registerUser: function (userRegistration) {
            return User.register(userRegistration).$promise;
        },      
        logOffUser: function () {
            return User.logOff().$promise;
        }
    };
}]);