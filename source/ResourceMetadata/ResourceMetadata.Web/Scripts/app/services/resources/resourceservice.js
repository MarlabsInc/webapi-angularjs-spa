app.factory('resourceSvc', ['$resource', '$q', 'locationSvc', function ($resource, $q, locationSvc) {
    var Resource = $resource('/api/Resources/:resourceId', { resourceId: '@Id' }, { 'update': { method: 'PUT' } });
    return {
        getTopFiveResources: function () {
            return Resource.query({ count: 5 });
        },
        getResources: function () {
            return Resource.query();
        },
        deleteResource: function (resourceId) {
            return Resource.delete({ resourceId: resourceId });
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