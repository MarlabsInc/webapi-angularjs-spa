app.controller('resourceMngrCtrl', function ($scope, $location, resourceMngrSvc) {
    $scope.isAuthenticated = false;
    $scope.loginMode = true;
    $scope.registrationMode = false;
    $scope.loaded = false;
    $scope.login = function (userLogin) {
        resourceMngrSvc.login(userLogin)
        .then(function (data) {
            $scope.loaded = false;
            $scope.isAuthenticated = true;
            $location.url('/Home');
        }, function (error) {

        });
    };

    $scope.toggleMode = function (mode) {
        if (mode === 'login') {
            $scope.loginMode = true;
            $scope.registrationMode = false;
        }
        else if (mode === 'register') {
            $scope.loginMode = false;
            $scope.registrationMode = true;
        }
    };
    $scope.register = function (userRegistration) {
        resourceMngrSvc.registerUser(userRegistration)
        .then(function (data) {
            $scope.loaded = false;
            $scope.isAuthenticated = true;
            $location.url('/Home');
        }, function (error) {

        });
    };

    $scope.logOff = function () {
        resourceMngrSvc.logOffUser()
        .then(function (data) {
            $scope.isAuthenticated = false;
            $scope.loginMode = true;
            $scope.registrationMode = false;
            $location.url('/Login');
        }, function (error) {

        });
    };

    //init();
    function init() {
        resourceMngrSvc.checkUserAuthentication()
        .then(function (data) {
            $scope.isAuthenticated = true;
            $location.url('/Home');
        }, function (reason) {

        });
    }
});