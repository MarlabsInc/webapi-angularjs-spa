app.factory('resourceSvc', ['$resource', '$q', 'locationSvc', 'serviceHelperSvc', function ($resource, $q, locationSvc, serviceHelper) {
    var Resource = serviceHelper.Resource;

    var getTopFiveResources = function () {
        return Resource.query({ count: 5 });
    };
    var getResources = function () {
        return Resource.query();
    };
    var deleteResource = function (resourceId) {
        return Resource.delete({ resourceId: resourceId });
    };
    var addResource = function (resource) {
        return Resource.save(resource);
    };
    var editResource = function (resource) {
        return Resource.update(resource);
    };
    var getResource = function (id) {
        return Resource.get({ resourceId: id });
    };

    var createResourceEditFormModel = function (resourceId) {
        var sample = $q.all([this.getResource(resourceId).$promise, locationSvc.getLocations().$promise]);
        return sample;
    };

    var getPagedResources = function (params) {
        return Resource.getPagedItems(params);
    };

    return {
        getTopFiveResources: getTopFiveResources,
        getResources: getResources,
        deleteResource: deleteResource,
        addResource: addResource,
        editResource: editResource,
        getResource: getResource,
        createResourceEditFormModel: createResourceEditFormModel,
        getPagedResources: getPagedResources
    };

}]);