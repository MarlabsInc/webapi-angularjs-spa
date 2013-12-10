app.directive('cstDelete', function () {
    return {
        replace: true,
        
    link: function ($scope, element, attrs, controller) {
        console.log(element);
        element.on('click', function (ev) { 
            return confirm('Delete item?');
        });
    }
};
});