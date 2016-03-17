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
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller:"LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller :"ProfileController"
                })
                .when("/register",{
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/forms",{
                    templateUrl: "views/forms/forms.view.html",
                    controller:"FormController"
                })
                .when("/fields",{
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController"
                })
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();