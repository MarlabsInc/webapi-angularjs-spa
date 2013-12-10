app.controller('activityAddCtrl', function ($scope, $location, $routeParams, activitySvc, errorMngrSvc) {
    $scope.activity = { resourceId: $routeParams.resourceId };
    $scope.addActivity = function (activity, date) {
        activitySvc.addActivity(activity)
            .then(function (addedActivity) {
                $location.url('/Resources/' + addedActivity.ResourceId);
            }, function (error) {
                errorMngrSvc.handleError(error);
            })

    }
});