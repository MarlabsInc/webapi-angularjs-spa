app.factory('resourceMngrSvc', ['$http', 'serviceHelperSvc', 'userProfileSvc', function ($http, serviceHelper, userProfileSvc) {

    var Token = serviceHelper.AuthorizationToken;
    var Account = serviceHelper.Account;

    var buildFormData = function (formData) {
        var dataString = '';
        for (var prop in formData) {
            if (formData.hasOwnProperty(prop)) {
                dataString += (prop + '=' + formData[prop] + '&');
            }
        }
        return dataString.slice(0, dataString.length - 1);
    };

    return {
        login: function (userLogin) {
            var formData = { username: userLogin.Email, password: userLogin.Password, grant_type: 'password' };
            return Token.requestToken(buildFormData(formData), function (data) {
                $http.defaults.headers.common.Authorization = "Bearer " + data.access_token;
                userProfileSvc.role = data.role;
            });
        },
        registerUser: function (userRegistration) {
            var registration = Account.register(userRegistration);
            return registration;
        },
        logOffUser: function () {
            $http.defaults.headers.common.Authorization = null;
        }
    };
}]);