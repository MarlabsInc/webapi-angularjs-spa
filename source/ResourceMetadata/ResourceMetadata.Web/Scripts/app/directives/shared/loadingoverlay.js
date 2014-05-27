"use strict";
utilities.directive('cstLoadingOverlay', ['$timeout', '$q', 'httpInterceptor', 'templateSvc', function ($timeout, $q, httpInterceptor, templateSvc) {
    var IS_HTML_PAGE = /\.html$|\.html\?/i;
    var modifiedTemplates = {};

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
                if (IS_HTML_PAGE.test(response.config.url)) {
                    if (!modifiedTemplates[response.config.url]) {
                        response.data = templateSvc.processTemplate(response);
                        modifiedTemplates[response.config.url] = true;
                    }
                }

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

utilities.factory('httpInterceptor', function () {
    return {};
});



utilities.service('templateSvc', ['$templateCache', 'userProfileSvc', function ($templateCache, userProfileSvc) {
    var HAS_FLAGS_EXP = /data-(keep|omit)/;
    return {
        processTemplate: function (response) {
            var content = response.data;
            var element = $('<div>').append(content);
            if (HAS_FLAGS_EXP.test(content)) {
                element.find('[data-omit="' + userProfileSvc.role + '"]').each(function () {
                    var subElem = $(this);
                    subElem.remove();
                });
            }
            content = element.html();
            $templateCache.put(response.config.url, content);
            return content;
        }
    };
}]);