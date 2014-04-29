
"use strict";
utilities.directive("cstExternalUrl", function ($window) {
    var webUrlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return {
        link: function (scope, element, attributes) {
            var url = attributes.cstExternalUrl;

            if (url && webUrlPattern.test(url)) {
                scope.isWebUrl = true;
                element.css("text-decoration", "underline");
                element.css("cursor", "pointer");
            }

            element.on("click", function () {
                if (scope.isWebUrl) {
                    $window.open(url);
                }
            });
        }
    };

});