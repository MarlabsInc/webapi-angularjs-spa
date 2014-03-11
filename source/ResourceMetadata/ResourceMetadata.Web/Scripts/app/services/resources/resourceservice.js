app.factory('resourceSvc', ['$resource', '$q', 'locationSvc', 'serviceHelperSvc', function ($resource, $q, locationSvc, serviceHelper) {
    var Resource = serviceHelper.Resource;
    return {
        getTopFiveResources: function () {
            return Resource.query({ count: 5 });
        },
        getResources: function () {
            return Resource.query();
        },
        deleteResource: function (resourceId) {
            return Resource.delete({ resourceId: resourceId }).$promise;
        },
        addResource: function (resource) {
            return Resource.save(resource).$promise;
        },
        editResource: function (resource) {
            return Resource.update(resource).$promise;
        },
        getResource: function (id) {
            return Resource.get({ resourceId: id });
        },
        createResourceAddFormModel: function () {
            return locationSvc.getLocations();
        },
        createResourceEditFormModel: function (resourceId) {
            var sample = $q.all([this.getResource(resourceId).$promise, locationSvc.getLocations().$promise]);
            sample.then(function (data) {
                return data;
            });
            return sample;
        }
    };
}]);