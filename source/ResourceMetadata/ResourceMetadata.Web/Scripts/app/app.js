window.app = angular.module('resourceManagerApp', ['ui.select2'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/Login', { templateUrl: '/Scripts/app/views/login/Login.html' })
            .when('/Locations', { templateUrl: '/Scripts/app/views/locations/Locations.html', controller: 'locationsCtrl' })
            .when('/About', { templateUrl: '/Scripts/app/views/about/About.html' })
            .when('/LocationAdd', { templateUrl: '/Scripts/app/views/locations/LocationAdd.html', controller: 'locationAddCtrl' })
            .when('/LocationEdit/:locationId', { templateUrl: '/Scripts/app/views/locations/LocationEdit.html', controller: 'locationEditCtrl' })
            .when('/Resources', { templateUrl: '/Scripts/app/views/resources/Resources.html', controller: 'resourcesCtrl' })
            .when('/ResourceAdd', { templateUrl: '/Scripts/app/views/resources/ResourceAdd.html', controller: 'resourceAddCtrl' })
            .when('/ResourceEdit/:resourceId', { templateUrl: '/Scripts/app/views/resources/ResourceEdit.html', controller: 'resourceEditCtrl' })
            .when('/Resources/:resourceId', { templateUrl: '/Scripts/app/views/resources/ResourceDetails.html', controller: 'resourceCtrl' })
            .when('/Resources/:resourceId/Activities/Add', { templateUrl: '/Scripts/app/views/activities/ResourceActivityAdd.html', controller: 'activityAddCtrl' })
            .when('/Home', { templateUrl: '/Scripts/app/views/home/Home.html', controller: 'homeCtrl' })
            .when('/Error', { templateUrl: '/Scripts/app/views/shared/Error.html' })
            .otherwise({ redirectTo: '/Login' });

        $httpProvider.interceptors.push('authorizationInterceptor');
    });




