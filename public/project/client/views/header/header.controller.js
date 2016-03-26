(function(){
    angular
        .module("JobMarketApp")
        .controller("HeaderController" ,HeaderController)

    function HeaderController($location,UserService) {
        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();
        function logout() {
            UserService
                .logout()
                .then(function() {
                    console.log("jinlaileo");
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();