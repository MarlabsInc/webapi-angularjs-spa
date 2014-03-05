window.app = angular.module('resourceManagerApp', ['ui.select2', 'ngRoute', 'ngResource', 'ngAnimate'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', '$provide', function ($routeProvider, $locationProvider, $httpProvider, $provide) {

        $provide.constant('userProfile', userProfile);
        var accessToken = localStorage.getItem("access_token") ;
        localStorage.clear();
        $provide.constant('userProfile', accessToken);
        $httpProvider.defaults.headers.common.Authorization = "Bearer " + accessToken;

        $locationProvider.html5Mode(true);
        $routeProvider
            //.when('/Login', { templateUrl: '/Scripts/app/views/login/Login.html' })
            .when('/Locations', { templateUrl: '/Scripts/app/views/locations/Locations.html', controller: 'LocationsCtrl' })
            .when('/About', { templateUrl: '/Scripts/app/views/about/About.html' })
            .when('/Locations/Add', { templateUrl: '/Scripts/app/views/locations/Add.html', controller: 'LocationCtrl' })
            .when('/Locations/Edit/:locationId', { templateUrl: '/Scripts/app/views/locations/Edit.html', controller: 'LocationCtrl' })
            .when('/Resources', { templateUrl: '/Scripts/app/views/resources/Resources.html', controller: 'ResourcesCtrl' })
            .when('/Resources/Add', { templateUrl: '/Scripts/app/views/resources/Add.html', controller: 'ResourceCtrl' })
            .when('/Resources/Edit/:resourceId', { templateUrl: '/Scripts/app/views/resources/Edit.html', controller: 'ResourceEditCtrl' })
            .when('/Resources/:resourceId', { templateUrl: '/Scripts/app/views/resources/Details.html', controller: 'ResourceCtrl' })
            .when('/Activities/Add', { templateUrl: '/Scripts/app/views/activities/Add.html', controller: 'ActivityAddCtrl' })
            .when('/Home', { templateUrl: '/Scripts/app/views/home/Home.html', controller: 'HomeCtrl' })
            .when('/Error', { templateUrl: '/Scripts/app/views/shared/Error.html' })
            .otherwise({ redirectTo: '/Home' });

        $httpProvider.interceptors.push('authorizationInterceptor');
        $httpProvider.interceptors.push('httpInterceptor');
    }]);




