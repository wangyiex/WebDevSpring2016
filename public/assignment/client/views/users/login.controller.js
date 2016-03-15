/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,UserService,$rootScope,$location) {
        $scope.login = login;
        function login(login) {
             UserService.findUserByCredentials(login.username, login.password)
                 .then(function (response){
                     var user = response.data;
                     if(user){
                         $rootScope.currentuser = user;
                         if(user.roles && user.roles.indexOf('admin') >= 0) {
                             $location.url('/admin');
                         }

                         $location.url('/profile');

                     }
                 })
            }
        }
})();