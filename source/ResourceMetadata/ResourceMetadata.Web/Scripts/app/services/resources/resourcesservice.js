app.factory('resourcesSvc', function ($http, $q) {
    return {
        url: '/api/Resources/',
        getResources: function () {
            var deferred = $q.defer();
            $http({ method: 'get', url: this.url })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        deleteResource: function (resourceId) {
            var deferred = $q.defer();
            $http({ method: 'delete', url: this.url + resourceId })
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        getTopFileResources: function () {
            var deferred = $q.defer();
            $http({ method: 'get', url: this.url + '?count=5' })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    };
});