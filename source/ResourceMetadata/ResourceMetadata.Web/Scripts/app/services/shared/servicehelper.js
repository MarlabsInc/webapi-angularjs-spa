app.factory('serviceHelperSvc', ['$http', '$resource', function ($http, $resource) {
    var baseUrl = config.apiurl;
    var buildUrl = function (resourceUrl) {
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
                logOff: { method: 'put' }
            }),
        Resource: $resource(buildUrl('api/Resources/:resourceId'),
            { resourceId: '@Id' },
            {
                'update': { method: 'PUT' },
                getPagedItems: { url: buildUrl("api/Resources?count=:count&page=:page&sortField=:sortField&sortOrder=:sortOrder"), method: 'GET', params: { count: '@count', page: '@page', sortField: '@sortField', sortOrder: '@sortOrder' } }
            }),
        Location: $resource(buildUrl('api/Locations/:locationId'), { locationId: '@Id' }, { 'update': { method: 'PUT' } }),

        ResourceActivity: $resource(buildUrl('api/Resources/:resourceId/Activities/:activityId'),
                { resourceId: '@ResourceId', activityId: '@Id' })
    };
}]);