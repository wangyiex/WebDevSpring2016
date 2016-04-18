(function(){
    angular
        .module("JobMarketApp")
        .controller("EmployerController",EmployerController)

    function EmployerController(UserService,$routeParams,$location) {
        var vm = this;
        var name = $routeParams.name;
        vm.update = update;
        vm.post =post;
        vm.updateprofile = true;
        vm.joblist = false;
        vm.postjob = false;
        vm.changevalue1 = changevalue1;
        vm.changevalue2 = changevalue2;
        vm.changevalue3 = changevalue3;
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

        function changevalue1() {
            vm.updateprofile = false;
            vm.joblist = true;
            vm.postjob = false;
        }

        function changevalue2() {
            vm.updateprofile = true;
            vm.joblist = false;
            vm.postjob = false;
        }
        function changevalue3() {
            vm.updateprofile = false;
            vm.joblist = false;
            vm.postjob = true;
        }

        function update(user) {
            UserService.updateUser(user._id,user)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    $location.url('/employer');
                });
        }

        function post(job,user) {
            var newjob = job;
            newjob.owner = user._id;
            UserService.createJob(newjob)
                .then(function(response) {
                    var njob = response.data;
                    console.log("xixi",njob);
                    return UserService.postJob(njob,user._id);
                })
                .then(function(response) {
                    $location.url('/employer');
                });
        }
    }
})();