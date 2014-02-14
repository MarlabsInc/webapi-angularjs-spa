app.controller('ResourcesCtrl', ['$scope', 'resourceSvc', 'confirmSvc', function ($scope, resourceSvc, confirmSvc) {
    $scope.resources = [];
    $scope.deleteResource = function (resourceId) {
        if (confirmSvc.confirm('Are you sure you want to delete this item?')) {
            resourceSvc.deleteResource(resourceId)
            .then(function (data) {
                loadResources();
            });
        }
    };
    init();

    function init() {
        loadResources();
    }
    function loadResources() {
        $scope.resources = resourceSvc.getResources();
    }
}]);