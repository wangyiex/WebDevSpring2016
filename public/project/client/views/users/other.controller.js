(function(){
    angular
        .module("JobMarketApp")
        .controller("OtherController",OtherController);

    function OtherController(UserService,$routeParams) {
        var vm = this;
        var email = $routeParams.email;

        function init() {
            if (email) {
                UserService
                    .findUserByEmail(email)
                    .then(function (response) {
                        vm.showuser = response.data;
                        console.log(vm.showuser);
                    })
            }
        }
        init();
    }
})();