app.controller('ResourceEditCtrl', ['$scope', '$location', '$routeParams', 'resourceSvc',
    function ($scope, $location, $routeParams, resourceSvc) {
        init();
        $scope.editResource = function (resource) {
            resourceSvc.editResource(resource).$promise.then(function (data) {
                $location.url('/Resources');
            });
        };

        function priorityValues() {
            var priorities = [];
            for (var i = 1; i <= 10; i++) {
                priorities.push({ priority: i });
            }

            return priorities;
        }

        function init() {
            resourceSvc.createResourceEditFormModel($routeParams.resourceId)
                .then(function (data) {
                    $scope.resource = data[0];
                    $scope.locations = data[1];
                    //hack for issue with select2 hard coded values pre-selection.
                    $scope.priorities = priorityValues();
                });
        }
    }]);