/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl: "views/home/home.view.html",
                })
                .when("/home",{
                    templateUrl: "views/home/home.view.html",
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                })
                .when("/register",{
                    templateUrl: "views/users/register.view.html",
                })
                .when("/forms",{
                    templateUrl: "views/forms/forms.view.html",
                })
                .when("/fields",{
                    templateUrl: "views/forms/fields.view.html",
                })
                .when("/register",{
                    templateUrl: "views/users/register.view.html",
                })
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                })
                .otherwise({
                    redirectTo: "views/home/home.view.html"
                });
        });
})();