app.controller('activitiesCtrl', function ($scope, $location, activitySvc, errorMngrSvc) {
    $scope.deleteActivity = function (activity) {
        if (confirm('Do you want to remove this activity?')) {
            activitySvc.deleteActivity(activity)
                .then(function (data) {
                    activitySvc.getActivites(activity.ResourceId).then(function (data) {
                        $scope.activities = data;
                    }, function (error) {
                        errorMngrSvc.handleError(error);
                    })
                }, function (error) {
                    errorMngrSvc.handleError(error);
                });
        }
        return false;
    }

});