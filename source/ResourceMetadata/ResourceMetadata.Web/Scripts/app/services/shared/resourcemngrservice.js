app.factory('resourceMngrSvc', function ($http, $resource, $q) {
    var User = $resource("/api/User/", null, { register: { method: 'post' }, login: { method: 'post' }, logOff: { method: 'put' } });

    return {
        login: function (userLogin) {
            return User.login(userLogin).$promise;
        },
        registerUser: function (userRegistration) {
            return User.register(userRegistration).$promise;
        },
        checkUserAuthentication: function () {
            var deferred = $q.defer();
            $http({ method: 'get', url: this.loginUrl })
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        logOffUser: function () {
            return User.logOff().$promise;
        }
    };
});