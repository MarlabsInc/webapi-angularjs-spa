app.service('activitySvc', ['$resource', function ($resource) {
    var Activity = $resource('/api/Resources/:resourceId/Activities/:activityId',
        { resourceId: '@ResourceId', activityId: '@Id' },
        { 'delete': { method: 'delete', url: '/api/ResourceActivities/:activityId' } });

    return {
        addActivity: function (activity) {
            return Activity.save({ resourceId: activity.resourceId }, activity).$promise;
        },
        deleteActivity: function (activity) {
            return Activity.delete({ activityId: activity.Id }).$promise;
        },
        getActivites: function (resourceId) {
            return Activity.query({ resourceId: resourceId });
        }
    };
}]);