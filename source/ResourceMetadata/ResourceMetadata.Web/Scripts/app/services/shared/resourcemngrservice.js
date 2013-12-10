app.factory('resourceMngrSvc', function ($http, $q) {
    return {
        loginUrl: '/api/Login/',
        login: function (userLogin) {
            var deferred = $q.defer();
            $http({ method: 'put', url: this.loginUrl, data: userLogin })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        registerUser: function (userRegistration) {
            var deferred = $q.defer();
            $http({ method: 'post', url: this.loginUrl, data: userRegistration })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
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
            var deferred = $q.defer();
            $http({ method: 'put', url: this.loginUrl, data: { Action: 1 } })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    };
});