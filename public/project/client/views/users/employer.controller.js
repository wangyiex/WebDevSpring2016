(function(){
    angular
        .module("JobMarketApp")
        .controller("EmployerController",EmployerController)

    function EmployerController(UserService,$routeParams,$location) {
        var vm = this;
        var name = $routeParams.name;
        vm.update = update;
        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        vm.currentUser = currentUser;
                    }
                });
        }
        init();

        function update(user) {
            UserService.updateUser(user._id,user)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    $location.url('/employer');
                });
        }
    }
})();