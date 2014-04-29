describe("Resource Manager Controller", function () {

    var $q, $location, deferred, scope, controller, resourceMngrSvc;
    var userData = { Email: "test@g.com", Password: "Marlabs" };
    var invalidUserRegistrationData = { email: "test@g.com", password: "Marlabs", confirmPassword: 'Marlabs1', firstName: 'first', lastName: 'last' };
    var validUserRegistrationData = { email: "test@g.com", password: "Marlabs", confirmPassword: 'Marlabs', firstName: 'first', lastName: 'last' };

    var resourceManagerServiceMock = {
        login: function (userData) {
            return { $promise: deferred.promise };
        },
        registerUser: function (userData) {
            return { $promise: deferred.promise };
        },
        logOffUser: function () {

        }
    };



    beforeEach(module('resourceManagerApp'));

    beforeEach(inject(function (_$q_, $rootScope, $controller, _$location_) {
        $q = _$q_;
        deferred = $q.defer();
        scope = $rootScope.$new();
        $location = _$location_;
        resourceMngrSvc = resourceManagerServiceMock;
        controller = $controller("ResourceMngrCtrl", { $scope: scope, resourceMngrSvc: resourceManagerServiceMock });
    }));

    it("Should call login function of resourceManagerService on login", function () {

        expect(scope).toBeDefined();
        expect(resourceMngrSvc).toBeDefined();

        spyOn(resourceMngrSvc, "login").and.callThrough();

        scope.login(userData);

        expect(resourceMngrSvc.login).toHaveBeenCalled();
    });

    it("Should emit logOn event after successfull login", function () {
        spyOn(scope, "$emit").and.callThrough();

        scope.login(userData);

        deferred.resolve();
        scope.$apply();

        expect(scope.$emit).toHaveBeenCalledWith("logOn");


    });

    it("Should redirect user to Home screen after successfull login", function () {
        scope.login(userData);

        deferred.resolve();
        scope.$apply();

        expect($location.url()).toEqual("/Home");

    });

    it("Should set errorMessage on scope for failed login", function () {

        scope.login(userData);
        deferred.reject({ status: 404 });
        scope.$apply();
        expect(scope.errorMessage).not.toEqual('');
    });

    it("Should validate password and confirmpassword before register", function () {
        spyOn(resourceMngrSvc, "registerUser").and.callThrough();

        scope.register(invalidUserRegistrationData);

        expect(scope.errorMessage).toBeDefined();
        expect(scope.errorMessage).not.toEqual('');
        expect(resourceMngrSvc.registerUser).not.toHaveBeenCalled();
    });

    it("Should call login method on successfull register", function () {

        spyOn(resourceMngrSvc, "login").and.callThrough();

        scope.register(validUserRegistrationData);

        deferred.resolve();
        scope.$apply();
        expect(resourceMngrSvc.login).toHaveBeenCalled();

    });

    it("Should set errorMessage on scope for failed register", function () {
        spyOn(resourceMngrSvc, "login").and.callThrough();

        scope.register(validUserRegistrationData);

        deferred.reject({ status: 404 });
        scope.$apply();

        expect(scope.errorMessage).toBeDefined();
        expect(scope.errorMessage).not.toEqual('');
        expect(resourceMngrSvc.login).not.toHaveBeenCalled();


    });

    it("Should call logOffUser function of resourceManagerService on logOff", function () {
        spyOn(resourceMngrSvc, "logOffUser").and.callThrough();
        scope.logOff();
        expect(resourceMngrSvc.logOffUser).toHaveBeenCalled();
    });

    it("Should emit logOff event after successfull logOff", function () {
        spyOn(scope, "$emit").and.callThrough();

        scope.logOff();
        expect(scope.$emit).toHaveBeenCalledWith("logOff");


    });

    it("Should redirect user to Login screen after successfull logoff", function () {

        scope.logOff();
        expect($location.url()).toEqual("/Login");

    });
});