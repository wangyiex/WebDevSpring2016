/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope,$location,UserService) {
        $scope.register= register;

        function register(uregister) {
           UserService.createUser(uregister,function(user){
               $rootScope.currentuser = user;
               console.log(user);
               $location.url('/profile');
           });
        }

    }
})();