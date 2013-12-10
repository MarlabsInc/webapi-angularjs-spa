app.controller('resourceAddCtrl', function ($scope, $location, resourceSvc, resourceUtilSvc, errorMngrSvc) {
    $scope.resource = {};
    resourceUtilSvc.createResourceAddFormModel()
    .then(function (model) {
        $scope.locations = model;
    }, function (error) {
        errorMngrSvc.handleError();
    });


    $scope.addResource = function (resource) {
        resourceSvc.addResource(resource)
        .then(function (data) {
            $location.url('/Resources');
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });
    }
});