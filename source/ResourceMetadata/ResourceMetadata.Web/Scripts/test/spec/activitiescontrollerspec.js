describe("Resource activities controller", function () {

    var scope, controller, activitySvc, deferred, $q, $controller;
    var activitySvcMock = {
        deleteActivity: function (activity) {
            return deferred.promise;
        },
        getActivites: function (resourceId) {
            return activityStaticData().activities.splice(1, 1);
        }
    };

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function ($rootScope, _$q_, _$controller_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        activitySvc = activitySvcMock;
        $q = _$q_;
        deferred = $q.defer();
        controller = $controller("ActivitiesCtrl", { $scope: scope, activitySvc: activitySvcMock })
    }));

    it("Should reload activites after successful deletion of activity", function () {

        spyOn(activitySvc, "deleteActivity").and.callThrough();
        spyOn(activitySvc, "getActivites").and.callThrough();

        scope.deleteActivity(activityStaticData().activity);
        deferred.resolve();
        scope.$apply();

        expect(activitySvc.deleteActivity).toHaveBeenCalled();
        expect(activitySvc.getActivites).toHaveBeenCalledWith(activityStaticData().activity.ResourceId);
        expect(scope.activities).toBeDefined();
    });
});