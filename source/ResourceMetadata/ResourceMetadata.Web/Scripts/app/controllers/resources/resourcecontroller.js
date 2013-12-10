app.controller('resourceCtrl', function ($scope, $routeParams, resourceSvc, errorMngrSvc) {
    $scope.resource = { hasActivites: false };
    resourceSvc.getResource($routeParams.resourceId)
        .then(function (resource) {
            $scope.resource = resource;
            $scope.loaded = true;
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });

});