describe("Location Controller", function () {

    var $controller, $q, controller, scope, locationSvc, deferred;

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function (_$controller_, $rootScope, _locationSvc_, _$q_) {
        $controller = _$controller_;
        scope = $rootScope.$new();
        locationSvc = _locationSvc_;
        $q = _$q_;
    }));

    afterEach(function () {

    });

    it("Should not load Location if routeParams does not have locationId OR locationId is 0", function () {

        expect(scope.Location).toBeUndefined();

        spyOn(locationSvc, "getLocation").and.returnValue(locationStaticData().location);

        controller = $controller("LocationCtrl", { $scope: scope, $routeParams: {} });

        expect(locationSvc.getLocation).not.toHaveBeenCalled();
        expect(scope.Location).toBeUndefined();
    });

    it("Should load Location if routeParams have locationId set to greater than 0", function () {

        expect(scope.Location).toBeUndefined();

        spyOn(locationSvc, "getLocation").and.returnValue(locationStaticData().location);
        var routeParams = { locationId: 6 };
        controller = $controller("LocationCtrl", { $scope: scope, $routeParams: routeParams });

        expect(locationSvc.getLocation).toHaveBeenCalled();
        expect(scope.location).toBeDefined();
        expect(scope.location.Id).toEqual(routeParams.locationId);
    });


    it("Should call addLocation method of locationService to add new Location", function () {
        deferred = $q.defer();

        spyOn(locationSvc, "addLocation").and.returnValue({ $promise: deferred.promise });
        controller = $controller("LocationCtrl", { $scope: scope, $routeParams: {} });

        scope.addLocation(locationStaticData().newLocation);

        deferred.resolve();
        scope.$apply();

        expect(locationSvc.addLocation).toHaveBeenCalled();
    });

    it("Should call editLocation method of locationService to update a Location", function () {
        deferred = $q.defer();

        spyOn(locationSvc, "editLocation").and.returnValue({ $promise: deferred.promise });
        controller = $controller("LocationCtrl", { $scope: scope });

        scope.editLocation(locationStaticData().location);

        deferred.resolve();
        scope.$apply();

        expect(locationSvc.editLocation).toHaveBeenCalled();
    });



});