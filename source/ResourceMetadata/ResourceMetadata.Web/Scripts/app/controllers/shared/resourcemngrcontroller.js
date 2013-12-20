app.controller('resourceMngrCtrl', function ($scope, $location, resourceMngrSvc) {
    $scope.loginMode = true;
    $scope.registrationMode = false;
    $scope.loaded = true;
    $scope.login = function (loginform, userLogin) {
        loginform.$setValidity('invaliduser', true);
        if (!loginform.$invalid) {
            $scope.loaded = false;
            resourceMngrSvc.login(userLogin)
            .then(function (data) {
                $scope.loaded = true;
                $scope.$emit('logOn');
                $location.url('/Home');
            }, function (error) {
                $scope.loaded = true;
                loginform.$setValidity('invaliduser', false);
            });
        }
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

        if (userRegistration.password !== userRegistration.confirmPassword) {
            $scope.invalidPasswords = true;
            return;
        }
        $scope.loaded = false;
        resourceMngrSvc.registerUser(userRegistration)
        .then(function (data) {
            $scope.loaded = true;
            $scope.$emit('logOn');
            $location.url('/Home')
        }, function (error) {

        });
    };

    $scope.logOff = function () {
        resourceMngrSvc.logOffUser()
        .then(function (data) {
            $scope.$emit('logOff');
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
            $location.url('/Home');
        }, function (reason) {

        });
    }
});