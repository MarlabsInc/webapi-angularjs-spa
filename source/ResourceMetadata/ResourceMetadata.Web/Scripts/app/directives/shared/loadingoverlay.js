app.directive('cstLoadingOverlay', ['$timeout', '$q', 'httpInterceptor', function ($timeout, $q, httpInterceptor) {

    return {
        restrict: 'E',
        templateUrl: '/Scripts/app/partials/Loader.html',
        link: function (scope, element, attribute) {
            var requestQueue = [];
            httpInterceptor.request = function (config) { 
                console.log('request: ' + config.url);
                requestQueue.push({});
                if (requestQueue.length == 1) {
                    showOverlay(element);
                }
                return config || $q.when(config);
            };
            httpInterceptor.response = function (response) {
                console.log('response: ' + response.config.url);
                requestQueue.pop();
                if (requestQueue.length === 0) {
                    $timeout(function () {
                        if (requestQueue.length === 0) {
                            hideOverlay(element);
                        }
                    }, 500);
                }
                return response || $q.when(response);
            };
            httpInterceptor.responseError = function (response) {
                requestQueue.pop();
                if (requestQueue.length === 0) {
                    $timeout(function () {
                        if (requestQueue.length === 0) {
                            hideOverlay(element);
                        }
                    }, 500);
                }
                return $q.reject(response);
            };
        }
    };

    function showOverlay(overlayDiv) {
        overlayDiv.removeClass('hide');
        overlayDiv.addClass('show');
    }

    function hideOverlay(overlayDiv) {
        overlayDiv.removeClass('show');
        overlayDiv.addClass('hide');
    }

}]);

app.factory('httpInterceptor', function () {
    return {};
});