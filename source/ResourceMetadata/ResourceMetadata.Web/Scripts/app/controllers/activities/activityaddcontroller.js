app.controller('ActivityAddCtrl', ['$scope', '$location', '$routeParams', 'activitySvc', function ($scope, $location, $routeParams, activitySvc) {
    $scope.activity = { ResourceId: $routeParams.resourceId };
    $scope.addActivity = function (activity, date) {
        activitySvc.addActivity(activity)
            .then(function (addedActivity) {
                $location.url('/Resources/' + addedActivity.ResourceId);
            });
    };
}]);