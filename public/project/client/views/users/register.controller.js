(function(){
    angular
        .module("JobMarketApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location,UserService) {
        var vm = this;
        vm.register = register;

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