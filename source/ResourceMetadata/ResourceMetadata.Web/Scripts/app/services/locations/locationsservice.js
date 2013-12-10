app.factory('locationsSvc', function ($http, $q) {
    return {
        url: '/api/Locations/',
        getLocations: function () {
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
        deleteLocation: function (locationId) {
            var deferred = $q.defer();

            $http({ method: 'delete', url: this.url+locationId })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });

            return deferred.promise;
        }
    };
});