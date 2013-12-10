app.directive('cstTopMenu', function () {
    return {
        restrict: 'E',
        replace:true,
        templateUrl: 'Scripts/app/partials/TopMenu.html',
        link: function (scope, element, attrs) {
            var menuItems = element.find("a");
            menuItems.on('click', function () {
                menuItems.removeClass('active');
                $(this).addClass('active');
            });
        }
    };
});