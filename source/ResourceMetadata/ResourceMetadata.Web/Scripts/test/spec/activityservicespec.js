describe("Resource activity service", function () {
    var activitySvc, $httpBackend, $q, serviceHelper;

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function (_activitySvc_, _$httpBackend_, _$q_, _locationSvc_) {
        activitySvc = _activitySvc_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        serviceHelper = serviceHelperMock();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("Should send POST request for addActivity", function () {
        expect(activitySvc.addActivity).toBeDefined();
        expect(angular.isFunction(activitySvc.addActivity)).toEqual(true);
        $httpBackend.expectPOST(serviceHelper.ResourceActivities).respond(activityStaticData().addedActivity);
        activitySvc.addActivity(activityStaticData().newActivity);
        $httpBackend.flush();
    });

    it("Should send DELETE request for deleteActivity", function () {
        expect(activitySvc.deleteActivity).toBeDefined();
        expect(angular.isFunction(activitySvc.deleteActivity)).toEqual(true);
        $httpBackend.expectDELETE(serviceHelper.ResourceActivity).respond({});
        activitySvc.deleteActivity(activityStaticData().activity);
        $httpBackend.flush();
    });

    it("Should send GET request for getActivities", function () {
        expect(activitySvc.getActivites).toBeDefined();
        expect(angular.isFunction(activitySvc.getActivites)).toEqual(true);
        $httpBackend.expectGET(serviceHelper.ResourceActivities).respond(activityStaticData().activities);
        activitySvc.getActivites(1);
        $httpBackend.flush();
    });
});