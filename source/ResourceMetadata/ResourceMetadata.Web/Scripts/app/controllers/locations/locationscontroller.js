
app.controller('LocationsCtrl', ['$scope', 'locationSvc',
        function ($scope, locationSvc) {
            $scope.locations = [];

            $scope.deleteLocation = function (locationId) {
                locationSvc.deleteLocation(locationId).$promise
                .then(function (data, responseHeaders) {
                    for (var i = $scope.locations.length - 1; i >= 0 ; i--) {
                        if ($scope.locations[i].Id === locationId) {
                            $scope.locations.splice(i, 1);
                            break;
                        }
                    }
                });

            };
            this.init = function () {
                this.loadLocations();
            }
            this.loadLocations = function () {
                $scope.locations = locationSvc.getLocations();
            }

            this.init();
        }]);