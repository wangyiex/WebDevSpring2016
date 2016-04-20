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
                .when("/other/:email",{
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
                .when("/search",{
                    templateUrl: "views/search/search.view.html",
                    controller:"SearchController",
                    controllerAs: "model",
                })
                .when("/detail/:name", {
                    templateUrl: "views/search/detail.view.html",
                    controller:"DetailController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/resume", {
                    templateUrl:"views/users/resume.view.html",
                    controller:"ResumeController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/employer", {
                    templateUrl:"views/users/employer.view.html",
                    controller:"EmployerController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/job/:jobId/:employerId",{
                    templateUrl: "views/users/jobdescription.view.html",
                    controller :"JobDescriptionController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }}
                )
                .when("/apply/:jobId/list",{
                    templateUrl: "views/users/applicants.view.html",
                    controller :"ApplicationController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }}
                )
                .otherwise({
                    redirectTo: "/home",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
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
