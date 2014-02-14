
app.controller('LocationsCtrl', ['$scope', 'confirmSvc', 'locationSvc',
        function ($scope, confirmSvc, locationSvc) {
            $scope.locations = [];
            init();
            $scope.deleteLocation = function (locationId) {
                if (confirmSvc.confirm('Do you want to delete this item?')) {
                    locationSvc.deleteLocation(locationId)
                    .then(function (data, responseHeaders) {
                        loadLocations();
                    });
                }
            };
            function init() {
                loadLocations();
            }
            function loadLocations() {
                $scope.locations = locationSvc.getLocations();
            }
        }]);