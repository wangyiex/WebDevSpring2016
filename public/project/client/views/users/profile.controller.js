(function(){
    angular
        .module("JobMarketApp")
        .controller("ProfileController",ProfileController)

    function ProfileController($scope,UserService,$routeParams,$location) {
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
                    $location.url('/profile');
                });
        }
    }
})();