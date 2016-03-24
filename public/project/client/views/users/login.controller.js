(function(){
    angular
        .module("JobMarketApp")
        .controller("LoginController", LoginController)

    function LoginController($scope,$location,UserService) {
        $scope.login = login;
        function login(login) {
            UserService.findUserByCredentials(login.email, login.password)
                .then(function(response){
                    var user = response.data;
                    if(user) {
                        UserService.setCurrentUser(user);
                        if (user.roles && user.roles.indexOf('admin') >= 0) {
                            $location.url('/admin');
                        }
                        $location.url('/profile');
                    }
                });
        }
    }
})();