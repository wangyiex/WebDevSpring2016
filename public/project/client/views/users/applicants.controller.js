(function(){
    angular
        .module("JobMarketApp")
        .controller("ApplicationController",ApplicationController)

    function ApplicationController(UserService,$routeParams,$location) {
        var vm = this;
        var jobid = $routeParams.jobId;
        function init() {
            UserService
                .findApplicants(jobid)
                .then(function (response) {
                    vm.job = response.data;
                })
        }
        init();

    }
})();