utilities.directive('cstModal', function () {
    return {
        required: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.on('click', function (e) {
                var modalId = '#' + attrs.cstModal;
                $(modalId).modal('show');
            });
        }
    };
});