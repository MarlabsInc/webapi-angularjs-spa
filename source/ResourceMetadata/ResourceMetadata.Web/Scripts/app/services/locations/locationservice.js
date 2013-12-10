app.factory('locationSvc', function ($http, $q) {
    return {
        addLocation: function (location) {
            var deferred = $q.defer();
            $http({ method: 'post', url: '/api/Locations', data: location })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        editLocation: function (location) {
            var deferred = $q.defer();
            $http({ method: 'put', url: '/api/Locations/' + location.Id, data: location })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        getLocation: function (id) {
            var deferred = $q.defer();
            $http({ method: 'get', url: '/api/Locations/' + id, data: location })
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