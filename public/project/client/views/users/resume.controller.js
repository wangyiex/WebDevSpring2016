(function(){
    angular
        .module("JobMarketApp")
        .controller("ResumeController",ResumeController)

    function ResumeController(UserService,$routeParams,$location) {
        var vm = this;
        var name = $routeParams.name;

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

    }
})();