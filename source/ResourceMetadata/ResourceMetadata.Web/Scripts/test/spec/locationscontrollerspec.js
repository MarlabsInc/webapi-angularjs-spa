"use strict";
describe('Locations Controller', function () {
    var $q, $controller, scope, controller, locationSvc, deferred;
    var serviceHelper = serviceHelperMock();

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function ($rootScope, _$q_, _$controller_, _locationSvc_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        locationSvc = _locationSvc_;
        $q = _$q_;
        deferred = $q.defer();
    }));

    afterEach(function () {
    });

    it('Should fetch locations on initialization', function () {
        expect(scope.locations).toBeUndefined();

        spyOn(locationSvc, 'getLocations').and.returnValue(locationStaticData().locations);

        controller = $controller("LocationsCtrl", { $scope: scope });

        expect(controller).toBeDefined();

        expect(locationSvc.getLocations).toHaveBeenCalled();

        expect(scope.locations.length).toEqual(2);
    });



    it('Should remove location from scope on deleteLocation', function () {

        spyOn(locationSvc, 'deleteLocation').and.returnValue({ $promise: deferred.promise });
        spyOn(locationSvc, 'getLocations').and.returnValue(locationStaticData().locations);

        controller = $controller("LocationsCtrl", { $scope: scope });

        scope.deleteLocation(1);

        deferred.resolve();
        scope.$apply();

        expect(locationSvc.deleteLocation).toHaveBeenCalled();
        expect(scope.locations).not.toContain(locationStaticData().location);

    });
});