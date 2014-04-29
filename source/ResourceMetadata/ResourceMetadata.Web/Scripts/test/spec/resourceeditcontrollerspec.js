describe("Resource Edit Controller", function () {

    var $q, resourceSvc, scope, deferred, $controller;

    var resourceSvcMock = {
        createResourceEditFormModel: function (resourceId) {
            return $q.when([resourceStaticData().resource, locationStaticData().locations]);
            //return deferred.promise;
        }
    };

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function ($rootScope, _$q_, _$controller_) {
        $controller = _$controller_;
        scope = $rootScope.$new();
        $q = _$q_;
        deferred = $q.defer();
        resourceSvc = resourceSvcMock;
    }));

    it("Should call createResourceEditFormModel of resourceSvc on initialization", function () {

        spyOn(resourceSvc, "createResourceEditFormModel").and.callThrough();

        var routeParams = { resourceId: 1 };

        controller = $controller("ResourceEditCtrl", { $scope: scope, resourceSvc: resourceSvcMock, $routeParams: routeParams });

        deferred.resolve();
        scope.$apply();

        expect(resourceSvc.createResourceEditFormModel).toHaveBeenCalledWith(routeParams.resourceId);

        expect(scope.locations).toBeDefined();
        expect(scope.resource).toBeDefined();
        expect(scope.priorities).toBeDefined();


    });


});