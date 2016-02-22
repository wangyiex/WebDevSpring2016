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
            UserService.findUserByCredentials(login.username,login.password,function(loginuser){
               if(loginuser){
                   $rootScope.currentuser = loginuser;
                   $location.url('/profile');
                   console.log(loginuser);
               }
            });
        }
    }

})();