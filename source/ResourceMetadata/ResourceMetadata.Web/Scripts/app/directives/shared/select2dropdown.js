app.directive('cstSelect2Dropdown', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            var select = element.select2();
            select.on("change", function (e) {
                alert($(this).select2("val"));
                ngModel.$setViewValue(e.val);
                scope.$apply();
            });
        }
    };
});