app.controller('ActivitiesCtrl', ['$scope', '$location', 'activitySvc', function ($scope, $location, activitySvc) {
    $scope.deleteActivity = function (activity) {
        activitySvc.deleteActivity(activity)
            .then(function (data) {
                $scope.activities = activitySvc.getActivites(activity.ResourceId);
            });
    };
}]);