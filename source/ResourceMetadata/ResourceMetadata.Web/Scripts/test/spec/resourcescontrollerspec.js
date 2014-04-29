describe("Resources controller", function () {
    var scope, resourceSvc, deferred, $q, $controller;

    var resourceSvcMock = {
        getResources: function () {
            return resourceStaticData().resources;
        },
        deleteResource: function (resource) {
            return { $promise: deferred.promise };
        }
    }

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function ($rootScope, _$controller_, _$q_) {
        $controller = _$controller_;
        scope = $rootScope.$new();
        $q = _$q_;
        deferred = $q.defer();
        resourceSvc = resourceSvcMock;
    }));

    it("Should load resources on initialization", function () {

        spyOn(resourceSvc, "getResources").and.callThrough();

        var controller = $controller("ResourcesCtrl", { $scope: scope, resourceSvc: resourceSvcMock });

        expect(scope.resources).toBeDefined();
        expect(scope.resources.length).toEqual(5);
        expect(resourceSvc.getResources).toHaveBeenCalled();
    });
   
    it("Should remove resource from scope on deleteResource", function () {

        spyOn(resourceSvc, 'deleteResource').and.callThrough();
        controller = $controller("ResourcesCtrl", { $scope: scope, resourceSvc: resourceSvcMock });
        scope.deleteResource(1);

        deferred.resolve();
        scope.$apply();

        expect(resourceSvc.deleteResource).toHaveBeenCalled();
        expect(scope.resources).not.toContain(resourceStaticData().resource);

    });


});