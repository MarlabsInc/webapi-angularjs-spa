describe("Resource Service", function () {
    var resourceSvc, locationSvc;
    serviceHelper = serviceHelperMock();

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function (_resourceSvc_, _$httpBackend_, _$q_, _locationSvc_) {
        resourceSvc = _resourceSvc_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        locationSvc = _locationSvc_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("Should contain a getTopFiveResources function", function () {
        expect(resourceSvc.getTopFiveResources).toBeDefined();
        expect(angular.isFunction(resourceSvc.getTopFiveResources)).toEqual(true);
    });

    it("Should contain a getResources function", function () {
        expect(resourceSvc.getResources).toBeDefined();
        expect(angular.isFunction(resourceSvc.getResources)).toEqual(true);
    });

    it("Should contain a deleteResource function", function () {
        expect(resourceSvc.deleteResource).toBeDefined();
        expect(angular.isFunction(resourceSvc.deleteResource)).toEqual(true);
    });

    it("Should contain a addResource function", function () {
        expect(resourceSvc.addResource).toBeDefined();
        expect(angular.isFunction(resourceSvc.addResource)).toEqual(true);
    });

    it("Should contain a editResource function", function () {
        expect(resourceSvc.editResource).toBeDefined();
        expect(angular.isFunction(resourceSvc.editResource)).toEqual(true);
    });

    it("Should contain a getResource function", function () {
        expect(resourceSvc.getResource).toBeDefined();
        expect(angular.isFunction(resourceSvc.getResource)).toEqual(true);
    });

    it("Should contain a createResourceEditFormModel function", function () {
        expect(resourceSvc.createResourceEditFormModel).toBeDefined();
        expect(angular.isFunction(resourceSvc.createResourceEditFormModel)).toEqual(true);
    });

    it("Should send a GET request to API for getTopFiveResources function and fetch 5 resources", function () {
        $httpBackend.expectGET(serviceHelper.TopFiveResources).respond(resourceStaticData().resources);
        var resources = resourceSvc.getTopFiveResources();
        $httpBackend.flush();
        expect(resources.length).toEqual(5);
    });

    it("Should send a GET request to API for getResources function", function () {
        $httpBackend.expectGET(serviceHelper.Resources).respond(resourceStaticData().resources);
        resourceSvc.getResources();
        $httpBackend.flush();
    });

    it("Should send a DELETE request to API for deleteResource function", function () {
        $httpBackend.expectDELETE(serviceHelper.Resource).respond({});
        resourceSvc.deleteResource(1);
        $httpBackend.flush();
    });

    it("Should POST data to API for addResource function", function () {
        $httpBackend.expectPOST(serviceHelper.Resources).respond(resourceStaticData().addedResource);
        resourceSvc.addResource(resourceStaticData().newResource);
        $httpBackend.flush();
    });

    it("Should send a PUT request to API for editResource function", function () {
        $httpBackend.expectPUT(serviceHelper.Resource).respond(resourceStaticData().resource);
        resourceSvc.editResource(resourceStaticData().resource);
        $httpBackend.flush();
    });

    it("Should call getLocations of locationSvc and getResoure of resourceSvc for createResourceEditFormModel method", function () {
        spyOn(locationSvc, "getLocations").and.returnValue(locationStaticData().locations);
        spyOn(resourceSvc, "getResource").and.returnValue(resourceStaticData().resource);

        resourceSvc.createResourceEditFormModel();

        expect(locationSvc.getLocations).toHaveBeenCalled();
        expect(resourceSvc.getResource).toHaveBeenCalled();

    });
});