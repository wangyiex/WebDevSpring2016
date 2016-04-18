(function(){
    angular
        .module("JobMarketApp")
        .controller("EmployerController",EmployerController)

    function EmployerController(UserService,$routeParams,$location) {
        var vm = this;
        var name = $routeParams.name;
        vm.update = update;
        vm.post =post;
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
                    UserService.setCurrentUser(response.data);
                    $location.url('/employer');
                });
        }
    }
})();