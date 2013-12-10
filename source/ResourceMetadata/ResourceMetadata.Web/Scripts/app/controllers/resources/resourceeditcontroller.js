app.controller('resourceEditCtrl', function ($scope, $location, $routeParams, resourceSvc, resourceUtilSvc, errorMngrSvc) {
    url: '/api/Resources/',
    $scope.resource = {};
    $scope.loading = "loading";
    resourceUtilSvc.createResourceEditFormModel($routeParams.resourceId)
        .then(function (data) {
            $scope.locations = data[1];
            $scope.resource = data[0];         
            $scope.loading = "";
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });

    $scope.editResource = function (resource) {
        resourceSvc.editResource(resource).then(function (data) {
            $location.url('/Resources');
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });
    };
});