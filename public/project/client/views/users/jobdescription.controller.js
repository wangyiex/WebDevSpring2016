(function(){
    angular
        .module("JobMarketApp")
        .controller("JobDescriptionController",JobDescriptionController)

    function JobDescriptionController(UserService,$routeParams,$location) {
        var vm = this;
        var jobid = $routeParams.jobId;
        var ownerid = $routeParams.employerId;
        vm.apply = apply;
        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        vm.currentUser = currentUser;
                        return UserService.findJobById(jobid,ownerid);
                    }
                })
                .then(function(response) {
                    vm.job = response.data;
                    console.log(vm.job,vm.currentUser);
                });

        }
        init();

        function apply(user) {
            UserService.updateUser(user._id,user)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    $location.url('/employer');
                });
        }

    }
})();