app.controller('ResourceMngrCtrl', ['$scope', '$location', '$window', 'resourceMngrSvc', function ($scope, $location, $window, resourceMngrSvc) {
    $scope.loginMode = true;
    $scope.registrationMode = false;
    $scope.loaded = true;
    $scope.login = function (loginform, userLogin) {
        $scope.loaded = false;
        userLogin.Action = 0;
        $scope.errorMessage = '';
        resourceMngrSvc.login(userLogin)
        .then(function (data) {
            $scope.loaded = true;
            $scope.$emit('logOn');
            $location.url('/Home');
        }, function (errorResponse) {
            $scope.loaded = true;
            if (errorResponse.status == 404) {
                $scope.errorMessage = errorResponse.data;
            }
            else {
                $scope.errorMessage = "An error occured while performing this action. Please try after some time.";
            }
            //$scope.errorMessage = errorResponse.data;
            //loginform.$setValidity('invaliduser', false);
        });
    };

    $scope.toggleMode = function (mode) {
        $scope.errorMessage = '';
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
            $scope.errorMessage = "Passwords do not match";
            return;
        }
        $scope.loaded = false;
        $scope.errorMessage = '';
        userRegistration.Action = 1;
        resourceMngrSvc.registerUser(userRegistration)
        .then(function (data) {
            resourceMngrSvc.login({ Email: userRegistration.email, Password: userRegistration.password }).then(function (data) {
                $scope.loaded = true;
                $scope.loginMode = true;
                $scope.registrationMode = false;
                $scope.$emit('logOn');
                $location.url('/Home');
            }, function (error) {
                $scope.loaded = true;
                $scope.errorMessage = "An error occured while performing this action. Please try after some time.";
            });
        }, function (error) {
            $scope.loaded = true;
            $scope.errorMessage = "An error occured while performing this action. Please try after some time.";
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
}]);