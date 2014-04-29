describe("Resource manager service", function () {
    var resourceMngrSvc, $httpBackend, $q, $http;
    var serviceHelper = serviceHelperMock();;

    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function (_resourceMngrSvc_, _$httpBackend_, _$q_, _$http_) {
        resourceMngrSvc = _resourceMngrSvc_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $http = _$http_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("Should POST data to server for login", function () {
        $httpBackend.expectPOST(serviceHelper.AuthorizationToken).respond({ access_token: 'access-token' });
        resourceMngrSvc.login({ Email: 'test@y.com', Password: 'password', grant_type: 'password' });
        $httpBackend.flush();
    });

    it("Should send a POST request for register user", function () {
        $httpBackend.expectPOST(serviceHelper.Account).respond({});
        resourceMngrSvc.registerUser({ Email: 'test@y.com', Password: 'password' });
        $httpBackend.flush();
    });

    it("Should set Authorization header for subsequent requests", function () {
        $httpBackend.expectPOST(serviceHelper.AuthorizationToken).respond({ access_token: 'access-token' });
        resourceMngrSvc.login({ Email: 'test@y.com', Password: 'password', grant_type: 'password' });
        $httpBackend.flush();
        expect($http.defaults.headers.common.Authorization).toEqual("Bearer access-token");
    });

    it("Should reset Authroization header on logOff", function () {
        resourceMngrSvc.logOffUser();
        expect($http.defaults.headers.common.Authorization).toBeNull();
    });

});