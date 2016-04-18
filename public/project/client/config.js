/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("JobMarketApp")
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
                    controller:"LoginController",
                    controllerAs: "model"
                })
                .when("/other/:username",{
                    templateUrl:"views/users/other.view.html",
                    controller:"OtherController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
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
                    controller:"RegisterController",
                    controllerAs:"model"
                })
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                })
                .when("/search",{
                    templateUrl: "views/search/search.view.html",
                    controller:"SearchController",
                    controllerAs: "model"
                })
                .when("/detail/:name", {
                    templateUrl: "views/search/detail.view.html",
                    controller:"DetailController",
                    controllerAs: "model"
                })
                .when("/resume", {
                    templateUrl:"views/users/resume.view.html",
                    controller:"ResumeController",
                    controllerAs:"model"
                })
                .when("/employer", {
                    templateUrl:"views/users/employer.view.html",
                    controller:"EmployerController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
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
