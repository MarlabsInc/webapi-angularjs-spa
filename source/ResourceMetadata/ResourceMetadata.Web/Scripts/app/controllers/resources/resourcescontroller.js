"use strict";
app.controller('ResourcesCtrl', ['$scope', 'resourceSvc', 'ngTableParams', function ($scope, resourceSvc, ngTableParams) {
    var fetchPagedStruct = function (pagedStruct) {
        var sorting = pagedStruct.sorting();
        var sortField;
        var sortOrder;
        if (sorting) {
            for (var prop in sorting) {
                sortField = prop;
                sortOrder = sorting[prop];
                break;
            }
        }

        return {
            page: pagedStruct.page(),
            count: pagedStruct.count(),
            sortField: sortField,
            sortOrder: sortOrder
        }
    };

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,
        sorting: {
            Name: 'asc'
        }
    }, {
        counts: [],
        total: 0,
        getData: function ($defer, params) {
            resourceSvc.getPagedResources(fetchPagedStruct(params))
                .$promise.then(function (data) {
                    params.total(data.TotalCount);// update table params                        
                    $defer.resolve(data.Data);// set new data
                }).catch(function (error) {
                    console.log(error);
                });
        }
    });

    $scope.deleteResource = function (resourceId) {
        resourceSvc.deleteResource(resourceId).$promise
        .then(function (data) {
            if ($scope.tableParams.page() !== 1 && $scope.tableParams.data.length === 1) {
                $scope.tableParams.page(1);
            }
            $scope.tableParams.reload();
        });
    };
}]);