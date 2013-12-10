app.factory('resourceSvc', function ($http, $q) {
    return {
        url: '/api/Resources/',

        addResource: function (resource) {
            var deferred = $q.defer();
            $http({ method: 'post', url: this.url, data: resource })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        editResource: function (resource) {
            var deferred = $q.defer();
            $http({ method: 'put', url: this.url + resource.Id, data: resource })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        getResource: function (id) {
            var deferred = $q.defer();
            $http({ method: 'get', url: this.url + id })
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