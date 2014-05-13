
app.controller('LocationsCtrl', ['$scope', 'ngTableParams', 'locationSvc',
        function ($scope, ngTableParams, locationSvc) {
            $scope.tableParams = new ngTableParams({
                total: 1,
                page: 1
            }, {
                counts: [],
                getData: function ($defer, params) {
                    locationSvc.getLocations().$promise.then(function (locations) {
                        $defer.resolve(locations);
                    });
                }
            });

            $scope.deleteLocation = function (locationId) {
                locationSvc.deleteLocation(locationId).$promise
                .then(function (data, responseHeaders) {
                    $scope.tableParams.reload();
                });
            };
        }]);