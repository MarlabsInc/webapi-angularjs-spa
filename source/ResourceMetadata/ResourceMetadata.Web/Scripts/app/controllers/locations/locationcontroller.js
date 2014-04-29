app.controller('LocationCtrl', ['$scope', '$location', '$routeParams', 'locationSvc',
        function ($scope, $location, $routeParams, locationSvc) {
            $scope.addLocation = function (location) {
                locationSvc.addLocation(location).$promise
                .then(function (data) {
                    $location.url('/Locations');
                });
            };
            $scope.editLocation = function (location) {
                locationSvc.editLocation(location).$promise.then(function (data) {
                    $location.url('/Locations');
                });
            };

            init();
            function init() {
                if ($routeParams.locationId > 0) {
                    $scope.location = locationSvc.getLocation($routeParams.locationId);
                }
            }
        }]);