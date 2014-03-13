app.service('confirmSvc', function () {
    this.confirm = function (msg) {
        if (typeof msg === 'string') {
            return confirm(msg);
        }
        throw (Error("Invalid type as msg"));
    }
});