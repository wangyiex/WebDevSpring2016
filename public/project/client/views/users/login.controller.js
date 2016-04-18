(function(){
    angular
        .module("JobMarketApp")
        .controller("LoginController", LoginController)

    function LoginController($scope,$location,UserService) {
        var vm = this
        vm.login = login;
        function login(login) {
            UserService.findUserByCredentials(login.email, login.password)
                .then(function(response){
                    var user = response.data;
                    if(user) {
                        UserService.setCurrentUser(user);
                        if (user.role == "employer") {
                            $location.url('/employer');
                        }else {
                            $location.url('/profile');
                        }
                    }
                });
        }
    }
})();