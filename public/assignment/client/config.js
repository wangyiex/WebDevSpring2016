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
                        getLoggedIn: checkCurrentUser
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
                    controller:"AdminController",
                    resolve: {
                        checkAdmin: checkAdmin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else
            {
                $location.url("/home");
            }
        });

        return deferred.promise;
    };


    function checkLoggedIn($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

   function checkCurrentUser($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();