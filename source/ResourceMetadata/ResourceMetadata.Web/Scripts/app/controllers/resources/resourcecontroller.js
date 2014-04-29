app.controller('ResourceCtrl', ['$scope', '$routeParams', '$location', 'resourceSvc','locationSvc', function ($scope, $routeParams, $location, resourceSvc, locationSvc) {
    $scope.resource = { hasActivites: false };

    $scope.addResource = function (resource) {
        resourceSvc.addResource(resource).$promise
        .then(function (data) {
            $location.url('/Resources');
        });
    };

    init();

    function init() {
        if ($routeParams.resourceId > 0) {
            $scope.resource = resourceSvc.getResource($routeParams.resourceId);
        }
        else {
            $scope.locations = locationSvc.getLocations();
        }
    }
}]);