app.factory('serviceHelperSvc', ['$http', '$resource', function ($http, $resource) {
   var baseUrl = 'http://localhost:3602/';
     //var baseUrl = '';
    var buildUrl = function (resourceUrl) {
        if (resourceUrl.lastIndexOf('/') !== resourceUrl.length - 1) {
            resourceUrl += "/";
        }

        return baseUrl + resourceUrl;
    };
    var addRequestHeader = function (key, value) {

    };
    return {
        AuthorizationToken: $resource(buildUrl("Token"), null,
        {
            requestToken: { method: 'POST', headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        }),
        Account: $resource(buildUrl('api/Account/'), null,
            {
                register: { method: 'post' },
                logOff: { method: 'GET' }
            }),
        Resource: $resource(buildUrl('api/Resources/:resourceId'),
            { resourceId: '@Id' },
            { 'update': { method: 'PUT' } }),

        setAuthroizationHeader: function (value) {
            $http.defaults.headers.common.Authorization = "Bearer " + value;
        },
        Location: $resource(buildUrl('/api/Locations/:locationId'), { locationId: '@Id' }, { 'update': { method: 'PUT' } }),

        ResourceActivity: $resource(buildUrl('/api/Resources/:resourceId/Activities/:activityId'),
                { resourceId: '@ResourceId', activityId: '@Id' },
                { 'delete': { method: 'delete', url: buildUrl('/api/ResourceActivities/:activityId') } })
    };
}]);