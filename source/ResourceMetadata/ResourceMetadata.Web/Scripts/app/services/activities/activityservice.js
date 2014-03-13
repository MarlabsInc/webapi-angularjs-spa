app.service('activitySvc', ['$resource', 'serviceHelperSvc', function ($resource, serviceHelper) {
    var Activity = serviceHelper.ResourceActivity;

    return {
        addActivity: function (activity) {
            return Activity.save({ resourceId: activity.resourceId }, activity).$promise;
        },
        deleteActivity: function (activity) {
            return Activity.delete({ resourceId: activity.ResourceId, activityId: activity.Id }).$promise;
        },
        getActivites: function (resourceId) {
            return Activity.query({ resourceId: resourceId });
        }
    };
}]);