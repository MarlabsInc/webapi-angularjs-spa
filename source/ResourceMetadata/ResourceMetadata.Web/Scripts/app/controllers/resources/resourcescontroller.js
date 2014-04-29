app.controller('ResourcesCtrl', ['$scope', 'resourceSvc', function ($scope, resourceSvc) {
    $scope.resources = [];
    $scope.deleteResource = function (resourceId) {
            resourceSvc.deleteResource(resourceId).$promise
            .then(function (data) {

                for (var i = $scope.resources.length - 1; i >= 0; i--) {
                    if ($scope.resources[i].Id === resourceId) {
                        $scope.resources.splice(i, 1);
                        break;
                    }
                }

            });
    };
    init();

    function init() {
        loadResources();
    }
    function loadResources() {
        $scope.resources = resourceSvc.getResources();
    }
}]);