app.controller('locationEditCtrl', function ($scope, $location, $routeParams, locationSvc, errorMngrSvc) {
    $scope.location = {};
    locationSvc.getLocation($routeParams.locationId)
        .then(function (data) {
            $scope.location = data;
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });

    $scope.editLocation = function (location) {
        locationSvc.editLocation(location).then(function (data) {
            $location.url('/Locations');
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });
    };
});