$(document).ready(function () {
    $("#registerform").submit(function (e) {
        $("#minlength").hide();
        $("#compare").hide();
        var password = $('#Password').val();
        var email = $("#Email").val();
        var confirmPassword = $('#ConfirmPassword').val();
        if (password) {
            if (password.length < 6) {
                $("#minlength").show();
                return false;
            }
            if (password.length >= 6 && password !== confirmPassword) {
                $("#compare").show();
                return false;
            }
        }

        register().done(function (data) {
            login(email, password).done(function (data) {
                if (window.localStorage) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('userName', data.userName);
                    localStorage.setItem('role', data.role);
                }
                $("#loadingIndicator").hide();
                window.location = '/Home/Index';
            }).fail(function (error) {
                console.log(error);
                $("#loadingIndicator").hide();
            });
        }).fail(function(error){
            console.log(error);
            $("#loadingIndicator").hide();
        });
        return false;
    });

    $("#loginform").submit(function (e) {
        var email = $("#Email").val();
        var password = $("#Password").val();
        if (email && password) {
            $("#loadingIndicator").show();
            deferredLogin(email, password).done(function (data) {
                if (window.localStorage) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('userName', data.userName);
                    localStorage.setItem('role', data.role);
                }
                window.location = '/Home/Index';

            }).fail(function (response) {
                console.log(response);
            }).always(function () {
                $("#loadingIndicator").hide();
            });
        }
        return false;
    });
});

function register() {
    var email = $('#Email').val();
    var password = $('#Password').val();
    var deferred = $.Deferred(function () {
        $("#loadingIndicator").show();
    });
    $.ajax({
        type: "POST",
        url: '/api/Account/',
        data:
        {
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            Password: password,
            Email: email,
            ConfirmPassword: $('#ConfirmPassword').val(),
        },
        success: function (data) {
            deferred.resolve(data);
        },
        error: function (err) {
            deferred.reject(err);
        }
    });

    return deferred.promise();
}

function login(userName, password) {
    if (userName && password) {
        var data = { grant_type: "password", username: userName, password: password };
        return $.post('/Token', data);
    }
}


function deferredLogin(userName, password) {
    var deferred = $.Deferred();
    $.ajax({
        type: "POST",
        url: '/Token',
        data: { grant_type: "password", username: userName, password: password },
        success: function (data) {
            deferred.resolve(data);
        },
        error: function (err) {
            deferred.reject();
        }
    });

    return deferred.promise();
}