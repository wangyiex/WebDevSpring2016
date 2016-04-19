(function(){
    angular
        .module("JobMarketApp")
        .controller("ProfileController",ProfileController)

    function ProfileController(UserService,$routeParams,$location,$sce) {
        var vm = this;
        var name = $routeParams.name;
        vm.update = update;
        vm.showjobs = showjobs;
        vm.showupdate=showupdate;
        vm.showresume = showresume;
        vm.jobs = null;
        vm.joblist = false;
        vm.profile = true;
        vm.resume = false;
        vm.safe = safe;
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
        function showjobs() {
            UserService.findJobs()
                .then(function(response) {
                    vm.profile = false;
                    vm.resume = false;
                    vm.joblist = true;
                    vm.jobs = response.data;
                    $location.url("/profile");
                })
        }

        function showupdate() {
            vm.profile = true;
            vm.joblist = false;
            vm.resume = false;
        }
        function showresume() {
            vm.profile = false;
            vm.joblist = false;
            vm.resume = true;
        }

        function safe(url) {
            var a =vm.currentUser.resume;
            console.log(a);
            return"../../project/public/uploads/"+a;
        }
    }
})();