"use strict";

describe('Locations Controller', function () {
    var $q, $controller, scope, controller, locationSvc, deferred;
    //var serviceHelper = serviceHelperMock();

    var locationSvcMock = function () {

        var locations = [{
            Id: 1,
            Name: 'Web',
            Description: 'Online resources',
            CreatedOn: new Date(),
            UserId: 1
        }, {
            Id: 2,
            Name: 'Desktop',
            Description: 'Local files from system',
            CreatedOn: new Date(),
            UserId: 1
        }];

        var getLocations = function () {
            var promise = $q.when(locations);
            return { $promise: promise };
        };

        var deleteLocation = function (locationId) {
            angular.forEach(locations, function (key, val) {
                if (val.Id === locationId) {
                    //locations.splice(val, 1);
                }
            });

            return { $promise: deferred.promise };
        };

        return {
            getLocations: getLocations,
            deleteLocation: deleteLocation
        }
    }

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function ($rootScope, _$q_, _$controller_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        $q = _$q_;
        deferred = $q.defer();
        locationSvc = locationSvcMock();
    }));



    afterEach(function () {
    });

    it('Should remove location from scope on deleteLocation', function () {

        spyOn(locationSvc, 'deleteLocation').and.callThrough();
        spyOn(locationSvc, 'getLocations').and.callThrough();

        controller = $controller("LocationsCtrl", { $scope: scope, locationSvc: locationSvc });
        scope.tableParams.settings().$scope = scope;
        scope.deleteLocation(1);

        deferred.resolve();
        scope.$apply();

        expect(locationSvc.deleteLocation).toHaveBeenCalled();
        expect(scope.$data).not.toContain({
            Id: 1,
            Name: 'Web',
            Description: 'Online resources',
            CreatedOn: new Date(),
            UserId: 1
        });
    });
});