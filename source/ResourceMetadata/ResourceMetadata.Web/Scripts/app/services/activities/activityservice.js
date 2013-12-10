app.service('activitySvc', function ($http, $location, $q) {
    return {
        addUrl: '/api/Resources/@resourceId/Activities/',
        deleteUrl: '/api/ResourceActivities/',
        getUrl: '/api/Resources/@resourceId/Activities/',
        addActivity: function (activity) {
            var deferred = $q.defer();
            $http({ method: 'post', url: this.addUrl.replace('@resourceId', activity.resourceId), data: activity })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        deleteActivity: function (activity) {
            var deferred = $q.defer();
            $http({ method: 'delete', url: this.deleteUrl + activity.Id })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        getActivites: function (resourceId) {
            var deferred = $q.defer();
            $http({ method: 'get', url: this.getUrl.replace('@resourceId', resourceId) })
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    };
});