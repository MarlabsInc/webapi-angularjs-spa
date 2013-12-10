app.controller('locationsCtrl', function ($scope, $location, confirmSvc, locationsSvc, errorMngrSvc) {

    $scope.locations = [];
    init();
    $scope.deleteLocation = function (locationId) {
        if (confirmSvc.confirm('Do you want to delete this item?')) {
            locationsSvc.deleteLocation(locationId)
                .then(function (data) {
                    loadLocations();
                }, function (error) {
                    errorMngrSvc.handleError(error);
                });
        }
    };




    function init() {
        loadLocations();
    }

    function loadLocations() {
        locationsSvc.getLocations().then(function (data) {
            $scope.locations = data;
            $scope.loaded = true;
            $scope.haveContent = data.length == 0;
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });
    }

});