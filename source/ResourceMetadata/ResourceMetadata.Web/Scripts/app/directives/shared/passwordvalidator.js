"use strict";

app.directive('cstPassword', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                //return
            }
            element.on('blur', function (e) {
                if (element.val().length < 6) {
                    scope.errorMessage = 'Password should contain at least 6 characaters';
                    ngModelCtrl.$setValidity('passwordlength', false);
                }
                else {
                    ngModelCtrl.$setValidity('passwordlength', true);
                }
            });
        }
    };

});