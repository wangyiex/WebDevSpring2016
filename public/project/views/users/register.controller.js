(function(){
    angular
        .module("JobMarketApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope,$location,UserService) {
        $scope.register= register;
        $scope.login = login;

        function login(login) {
            var user = UserService.findUserByCredentials(login.email, login.password);
            if(user){
                $rootScope.currentuser = user;
                if(user.roles && user.roles.indexOf('admin') >= 0) {
                    $location.url('/admin');
                }

                $location.url('/profile');

            }
        }
        function register(uregister) {
            console.log("hahah")
            var newUser = UserService.createUser(uregister);
            $rootScope.currentuser = newUser;
            //$location.url("/profile");
            console.log(newUser);
        }
    }
})();