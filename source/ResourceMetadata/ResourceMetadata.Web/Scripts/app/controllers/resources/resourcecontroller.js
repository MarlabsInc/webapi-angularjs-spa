app.controller('ResourceCtrl', ['$scope', '$routeParams', '$location', 'resourceSvc', function ($scope, $routeParams, $location, resourceSvc) {
    $scope.resource = { hasActivites: false };
    $scope.addResource = function (resource) {
        resourceSvc.addResource(resource)
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
            $scope.locations = resourceSvc.createResourceAddFormModel();
        }
    }
}]);