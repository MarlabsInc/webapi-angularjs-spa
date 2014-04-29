app.factory('authorizationInterceptor', ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {
    return {
        responseError: function (rejection) {
            switch (rejection.status) {
                case 401: {
                    $rootScope.$broadcast('logOff');
                    $location.url('/Login');
                    break;
                }
                case 403: {
                    $location.url('/Login');
                    break;
                }
                default: {
                    break;
                }
            }

            return $q.reject(rejection);
        }
    };
}]);

