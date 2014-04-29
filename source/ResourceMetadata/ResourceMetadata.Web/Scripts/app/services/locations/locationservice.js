app.factory('locationSvc', ['$resource', 'serviceHelperSvc', function ($resource, serviceHelper) {
    var Location = serviceHelper.Location;
    var addLocation = function (location) {
        //$resource.save will immediately return an object which will have $promise property. 
        //This property will get resolved with values, once the Server returns response
        return Location.save(location); 
    };
    var editLocation = function (location) {
        var updation = Location.update(location);
        return updation;
    };
    var getLocation = function (id) {
        return Location.get({ locationId: id });
    };
    var getLocations = function () {
        return Location.query();
    };
    var deleteLocation = function (locationId) {
        return Location.delete({ locationId: locationId });
    };

    return {
        addLocation: addLocation,
        editLocation: editLocation,
        getLocation: getLocation,
        getLocations: getLocations,
        deleteLocation: deleteLocation
    };
}]);