app.service('confirmSvc', function () {
    return {
        confirm: function (msg) {
            if (typeof msg === 'string') {
                return confirm(msg);
            }
            throw (Error("Invalid type as msg"));
        }
    };
});