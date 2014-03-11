app.factory('resourceMngrSvc', ['serviceHelperSvc', function (serviceHelper) {

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
                serviceHelper.setAuthroizationHeader(data.access_token);
            }).$promise;
        },
        registerUser: function (userRegistration) {
            var registration = Account.register(userRegistration);
            return registration.$promise;
        },
        logOffUser: function () {
            return Account.logOff().$promise;
        }
    };
}]);