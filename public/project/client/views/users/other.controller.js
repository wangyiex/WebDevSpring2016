(function(){
    angular
        .module("JobMarketApp")
        .controller("OtherController",OtherController);

    function OtherController($scope,UserService,$rootScope,$location,$routeParams) {
        var vm = this;
        var username = $routeParams.username;

        function init() {
            if (username) {
                UserService
                    .showprofileByUsername(username)
                    .then(function (response) {
                        vm.showuser = response.data;
                    })
            }
        }
        init();
    }
})();