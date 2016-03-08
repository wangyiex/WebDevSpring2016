(function(){
    angular
        .module("JobMarketApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope,$location,UserService) {
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
    }
})();