describe('Location Service', function () {

    var locationSvc, deferred, $httpBackend, $q, serviceHelper = serviceHelperMock();

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function (_locationSvc_, _$httpBackend_, _$q_) {
        locationSvc = _locationSvc_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("Should have getLocations method", function () {
        expect(locationSvc.getLocations).toBeDefined();
        expect(angular.isFunction(locationSvc.getLocations)).toEqual(true);
    });


    it("Should have getLocation method", function () {
        expect(locationSvc.getLocation).toBeDefined();
        expect(angular.isFunction(locationSvc.getLocation)).toEqual(true);
    });


    it("Should have addLocation method", function () {
        expect(locationSvc.addLocation).toBeDefined();
        expect(angular.isFunction(locationSvc.addLocation)).toEqual(true);
    });


    it("Should have deleteLocation method", function () {
        expect(locationSvc.deleteLocation).toBeDefined();
        expect(angular.isFunction(locationSvc.deleteLocation)).toEqual(true);
    });

    it("Should POST data to api on save", function () {
        $httpBackend.expectPOST(serviceHelper.Locations).respond(locationStaticData().location);
        locationSvc.addLocation(locationStaticData().newLocation);
        $httpBackend.flush();
    });

    it("Should PUT data to api on edit", function () {
        $httpBackend.expectPUT(serviceHelper.Location).respond(locationStaticData().location);
        locationSvc.editLocation(locationStaticData().location);
        $httpBackend.flush();
    });

    it("Should call delete api on deleteLocation", function () {
        $httpBackend.expectDELETE(serviceHelper.Location).respond({});
        locationSvc.deleteLocation(6);
        $httpBackend.flush();
    });

    it("Should fetch Locations using GET request for getLocations method", function () {
        $httpBackend.expectGET(serviceHelper.Locations).respond(locationStaticData().locations);
        var locations = locationSvc.getLocations();
        $httpBackend.flush();
        expect(locations).toBeDefined();
        expect(locations.length).toEqual(2);
    });

});