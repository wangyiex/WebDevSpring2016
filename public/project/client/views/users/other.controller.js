(function(){
    angular
        .module("JobMarketApp")
        .controller("OtherController",OtherController);

    function OtherController(UserService,$routeParams,$location) {
        var vm = this;
        var email = $routeParams.email;
        vm.likeed = false;
        vm.unliked = false;
        vm.like = like;
        function init() {
            if (email) {
                UserService
                    .findUserByEmail(email)
                    .then(function (response) {
                        vm.showuser = response.data;
                        console.log(vm.showuser);
                    })
            }
            UserService
                .getCurrentUser()
                .then( function (response) {
                    vm.currentUser = response.data;
                    if(vm.currentUser.likes.indexOf(email) != -1) {
                        vm.likeed = true;
                    }else {
                        vm.unliked = true;
                    }
                })
        }
        init();
        function like(user) {
            var currentUser = vm.currentUser;
            UserService
                .followUser(user,currentUser)
                .then(function(response) {
                    if(response.data) {
                        $location.url("#/other/{{user.email}}")
                    }
                })

        }
    }
})();