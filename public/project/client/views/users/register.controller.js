(function(){
    angular
        .module("JobMarketApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$location,UserService) {
        $scope.register= register;
        $scope.login = login;

        // the implementation of user login
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

        //the implementation of user registration
        function register(uregister) {
            UserService.createUser(uregister)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();