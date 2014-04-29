app.service('activitySvc', ['$resource', 'serviceHelperSvc', function ($resource, serviceHelper) {
    var Activity = serviceHelper.ResourceActivity;
    var addActivity = function (activity) {
        return Activity.save({ resourceId: activity.ResourceId }, activity).$promise;
    };
    var deleteActivity = function (activity) {
        return Activity.delete({ resourceId: activity.ResourceId, activityId: activity.Id }).$promise;
    };
    var getActivites = function (resourceId) {
        return Activity.query({ resourceId: resourceId });
    };

    return {
        addActivity: addActivity,
        deleteActivity: deleteActivity,
        getActivites: getActivites
    };
}]);