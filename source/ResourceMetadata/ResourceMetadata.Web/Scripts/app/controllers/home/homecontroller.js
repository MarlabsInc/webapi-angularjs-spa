app.controller('HomeCtrl', ['$scope', 'resourceSvc', function ($scope, resourceSvc) {
    init();
    function init() {
        loadResources();
    }
    function loadResources() {
        $scope.resources = resourceSvc.getTopFiveResources();
    }
}]);