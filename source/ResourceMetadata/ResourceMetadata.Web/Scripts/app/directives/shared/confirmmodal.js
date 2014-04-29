"use strict";
utilities.directive("cstConfirmModal", [function () {
    return {
        restrict: "A",
        scope: {
            approve: '&onApprove',
            deny: '&onDeny',
            closable: '=closable',
            id: '@modalId',
            title: '@title',
            message: '@message'
        },
        templateUrl: "/Scripts/app/partials/confirm-modal.html",
        link: function (scope, element, attrs, ngModelCtrl) {

            scope.closeModal = function () {
                angular.element('#' + scope.id).modal('hide');
            };

            element.on('click', function (e) {
                angular.element('#' + scope.id).modal('show');
            });
        }
    };
}]);