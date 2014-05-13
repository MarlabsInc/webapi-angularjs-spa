describe("Resources controller", function () {
    var scope, resourceSvc, deferred, $q, $controller;

    var resourceSvcMock = function () {
        var resources = resourceStaticData().resources;
        var deleteResource = function (resourceId) {
            angular.forEach(resources, function (key, val) {
                if (key.Id === resourceId) {
                    resources.splice(val, 1);
                }
            });

            return { $promise: deferred.promise };
        };
        var getResources = function () {
            return resourceStaticData().resources;
        };
        var getPagedResources = function () {
            var result = $q.when({
                TotalCount: resources.length,
                Data: resources
            });
            return { $promise: result };
        }
        return {
            getResources: getResources,
            deleteResource: deleteResource,
            getPagedResources: getPagedResources
        }
    }

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function ($rootScope, _$controller_, _$q_) {
        $controller = _$controller_;
        scope = $rootScope.$new();
        $q = _$q_;
        deferred = $q.defer();
        resourceSvc = resourceSvcMock();
    }));   

    it("Should remove resource from scope on deleteResource", function () {

        spyOn(resourceSvc, 'deleteResource').and.callThrough();
        spyOn(resourceSvc, 'getResources').and.callThrough();

        controller = $controller("ResourcesCtrl", { $scope: scope, resourceSvc: resourceSvc });
        scope.tableParams.settings().$scope = scope;

        scope.deleteResource(1);

        deferred.resolve();
        scope.$apply();

        expect(resourceSvc.deleteResource).toHaveBeenCalled();
        expect(scope.$data).not.toContain({
            Id: 1,
            Name: "Resource1",
            Description: "Description for Resource1",
            LocationId: 1,
            Path: "http://www.adf.com",
            Priority: 3,
            CreatedOn: new Date(2014, 3, 1)
        });
    });


});