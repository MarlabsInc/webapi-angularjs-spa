describe("Resource Controller", function () {

    var $controller, $q, controller, scope, locationSvc, resourceSvc, deferred;

    var locationSvcMock = {
        getLocation: function () {
            return locationStaticData().location;
        },
        getLocations: function () {
            return locationStaticData().locations;
        }
    };

    var resourceSvcMock = {
        addResource: function (resource) {
            return { $promise: deferred.promise };
        },
        getResource: function (resourceId) {
            return resourceStaticData().resource;
        }
    };

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function (_$controller_, $rootScope, _$q_) {
        $controller = _$controller_;
        scope = $rootScope.$new();
        locationSvc = locationSvcMock;
        resourceSvc = resourceSvcMock;
        $q = _$q_;
        deferred = $q.defer();
    }));

    afterEach(function () {

    });

    it("Should not load Resource if routeParams does not have resourceId OR resourceId is 0", function () {

        spyOn(resourceSvc, "getResource").and.callThrough();
        spyOn(locationSvc, "getLocations").and.callThrough();

        controller = $controller("ResourceCtrl", { $scope: scope, resourceSvc: resourceSvcMock, locationSvc: locationSvcMock, $routeParams: {} });

        expect(resourceSvc.getResource).not.toHaveBeenCalled();
        expect(locationSvc.getLocations).toHaveBeenCalled();
    });

    it("Should load Resource if routeParams have resourceId set to greater than 0", function () {
        spyOn(resourceSvc, "getResource").and.callThrough();
        spyOn(locationSvc, "getLocations").and.callThrough();

        var routeParams = { resourceId: 1 };
        controller = $controller("ResourceCtrl", { $scope: scope, resourceSvc: resourceSvcMock, locationSvc: locationSvcMock, $routeParams: routeParams });
   
        expect(resourceSvc.getResource).toHaveBeenCalledWith(routeParams.resourceId);
        expect(scope.resource.Id).toEqual(routeParams.resourceId);
    });


    it("Should call addResource method of resourceService to add new Resource", function () {

        spyOn(resourceSvc, "addResource").and.callThrough();

        controller = $controller("ResourceCtrl", { $scope: scope, resourceSvc: resourceSvcMock, locationSvc: locationSvcMock, $routeParams: {} });

        scope.addResource(resourceStaticData().newResource);

        deferred.resolve();
        scope.$apply();

        expect(resourceSvc.addResource).toHaveBeenCalled();
    });
});