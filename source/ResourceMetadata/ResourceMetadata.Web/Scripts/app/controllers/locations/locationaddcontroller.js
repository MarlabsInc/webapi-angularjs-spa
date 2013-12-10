app.controller('locationAddCtrl', function ($scope, $location, locationSvc, errorMngrSvc) {  
    $scope.addLocation = function (location) {
        locationSvc.addLocation(location)
        .then(function (data) {
            $location.url('/Locations');
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });
    }
});