app.controller('ActivitiesCtrl', ['$scope', '$location', 'activitySvc', function ($scope, $location, activitySvc) {
    $scope.deleteActivity = function (activity) {
        if (confirm('Do you want to remove this activity?')) {
            activitySvc.deleteActivity(activity)
                .then(function (data) {
                    $scope.activities = activitySvc.getActivites(activity.ResourceId);
                });
        }
        return false;
    };
}]);