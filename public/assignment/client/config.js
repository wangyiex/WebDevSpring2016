/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{
                    templateUrl: "views/home/home.view.html",
                    controller:"HomeController",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller:"LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller :"ProfileController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/register",{
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/forms",{
                    templateUrl: "views/forms/forms.view.html",
                    controller:"FormController",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/form/:formId/fields",{
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                console.log(currentUser);
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();