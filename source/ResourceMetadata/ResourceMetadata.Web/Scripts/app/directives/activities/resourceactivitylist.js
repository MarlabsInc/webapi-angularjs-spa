app.directive('resourceActivityList', function () {
    return {
        restrict: 'E',
        templateUrl: '/Scripts/app/directives/activities/ResourceActivityList.html',
        scope: {
            activities: "=activities"
        }
    };

});