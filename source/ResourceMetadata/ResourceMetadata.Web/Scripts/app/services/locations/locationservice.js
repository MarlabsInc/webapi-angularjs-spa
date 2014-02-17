app.factory('locationSvc', ['$resource', function ($resource) {
    var url = '/api/Locations/';
    var Location = $resource('/api/Locations/:locationId', { locationId: '@Id' }, { 'update': { method: 'PUT' } });

    return {
        addLocation: function (location) {
            //$resource.save will immediately return an object which will have $promise property. 
            //This property will get resolved with values, once the Server returns response
            return Location.save(location).$promise;
        },
        editLocation: function (location) {
            var updation = Location.update(location);
            return updation.$promise;
        },
        getLocation: function (id) {
            return Location.get({ locationId: id });
        },
        getLocations: function () {
            return Location.query();
        },
        deleteLocation: function (locationId) {
            return Location.delete({ locationId: locationId }).$promise;
        }
    }
}]);