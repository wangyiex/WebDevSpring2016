(function(){
    angular
        .module("JobMarketApp")
        .controller("OtherController",OtherController);

    function OtherController(UserService,$routeParams,$location) {
        var vm = this;
        var email = $routeParams.email;
        vm.liked = false;
        vm.unliked = false;
        vm.like = like;
        vm.unlike = unlike;
        function init() {
                UserService
                    .findUserByEmail(email)
                    .then(function (response) {
                        vm.showuser = response.data;
                        return UserService.getCurrentUser();
                    })
                    .then( function (response) {
                        vm.currentUser = response.data;
                        if (vm.currentUser.likes.indexOf(vm.showuser.email) !=-1) {
                            vm.liked = true;
                        }else{
                            vm.unliked = true;
                        }
                    });
        }
        init();

        function like(email) {
            UserService
                .followUser(email)
                .then(function(response) {
                   return UserService.getUpdateCurrentUser(vm.currentUser.email);
                })
                .then(function(response) {
                    vm.currentUser = response.data;
                    $location.url("/profile");
                })

        }
        function unlike(email) {
            UserService
                .unfollowUser(email)
                .then(function(response) {
                    return UserService.getUpdateCurrentUser(vm.currentUser.email);
                })
                .then(function(response) {
                    vm.currentUser = response.data;
                    $location.url("/profile");
                })

        }

    }
})();