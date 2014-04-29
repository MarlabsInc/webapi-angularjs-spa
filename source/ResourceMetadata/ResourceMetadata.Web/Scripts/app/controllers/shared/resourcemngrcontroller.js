app.controller('ResourceMngrCtrl', ['$scope', '$location', 'resourceMngrSvc', function ($scope, $location, resourceMngrSvc) {
    $scope.login = function (userLogin) {
        $scope.errorMessage = '';
        resourceMngrSvc.login(userLogin).$promise
        .then(function (data) {
            $scope.$emit('logOn');
            $location.url('/Home');
        }).catch(function (errorResponse) {
            if (errorResponse.status == 404) {
                $scope.errorMessage = errorResponse.data;
            }
            if (errorResponse.status === 400) {
                $scope.errorMessage = "Invalid Email/Password";
            }
            else {
                $scope.errorMessage = "An error occured while performing this action. Please try after some time.";
            }
        });
    };

    $scope.register = function (userRegistration) {
        if (userRegistration.password !== userRegistration.confirmPassword) {
            $scope.errorMessage = "Passwords do not match";
            return;
        }

        $scope.errorMessage = '';

        resourceMngrSvc.registerUser(userRegistration).$promise
        .then(function (data) {
            return resourceMngrSvc.login({ Email: userRegistration.email, Password: userRegistration.password }).$promise.then(function (data) {
                $scope.$emit('logOn');
                $location.url('/Home');
            });
        }).catch(function (error) {
            if (error.status === 400) {
                $scope.errorMessage = "Email already exists.";
            }
            else {
                $scope.errorMessage = "An error occured while performing this action. Please try after some time.";
            }
        });
    };

    $scope.logOff = function () {
        resourceMngrSvc.logOffUser();
        $scope.$emit('logOff');
        $location.url('/Login');
    };
}]);