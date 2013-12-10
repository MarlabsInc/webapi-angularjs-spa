app.factory('resourceUtilSvc', function ($q, locationsSvc, resourceSvc) {
    return {
        createResourceAddFormModel: function () {
            var deferred = $q.defer();
            locationsSvc.getLocations()
            .then(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        },
        createResourceEditFormModel: function (resourceId) { 
            var sample = $q.all([resourceSvc.getResource(resourceId), locationsSvc.getLocations()]); 
            sample.then(function (data) { 
                return data;
            }); 

            return sample; 
        }
    }

});