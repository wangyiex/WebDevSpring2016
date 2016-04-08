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
            console.log(uregister);
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
            if (uregister.emails == null) {
                $scope.message = "Please include @ in in email";
                return;
            }
            UserService
                .register(uregister)
                .then(function(response){
                    var user = response.data;
                    if(user != null) {
                        $rootScope.currentUser = user;
                        $location.url("/profile");
                    }else {
                        $scope.message = "username has already exist,please try another one"
                    }
                },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();