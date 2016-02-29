/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope,$location,UserService) {
        $scope.register= register;
        $scope.message = null;

        function register(uregister) {
            $scope.message = null;
            if (uregister == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!uregister.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!uregister.password || !uregister.verify) {
                $scope.message = "Please provide a password";
                return;
            }
            if (uregister.password != uregister.verify) {
                $scope.message = "Passwords must match";
                return;
            }
            var newUser = UserService.createUser(uregister);
            $rootScope.currentuser = newUser;
            $location.url("/profile");
        }
    }
})();