app.controller('homeCtrl', function ($scope, resourcesSvc) {
    init(); 
    function init() {
        loadResources();
    } 
    function loadResources() {
        resourcesSvc.getTopFileResources().then(function (data) {
            $scope.resources = data;
            $scope.loaded = true;
            $scope.hasContent = data.length > 0;
        }, function (reason) {
            //errorMngrSvc.handleError(reason);
        });
    }
})