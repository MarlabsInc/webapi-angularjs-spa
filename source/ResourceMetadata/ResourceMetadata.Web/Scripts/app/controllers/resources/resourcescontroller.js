app.controller('resourcesCtrl', function ($scope, resourcesSvc, errorMngrSvc, confirmSvc) {

    $scope.resources = [];
    $scope.deleteResource = function (resourceId) {
        if (confirmSvc.confirm('Are you sure you want to delete this item?')) {
            resourcesSvc.deleteResource(resourceId)
            .then(function (data) {
                loadResources();
            }, function (error) {
                errorMngrSvc.handleError(error);
            })
        }
    };
    init();

    function init() {
        loadResources();
    }

    function loadResources() {
        resourcesSvc.getResources().then(function (data) {
            $scope.resources = data;
            $scope.loaded = true;
            $scope.haveContent = data.length == 0;
        }, function (reason) {
            errorMngrSvc.handleError(reason);
        });
    }

});