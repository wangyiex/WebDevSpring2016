/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$rootScope,$location) {
        var vm = this;
        vm.update = update;

        function init() {
            UserService.getCurrentUser()
                .then(function(response) {
                   var currentUser = response.data;
                   if(currentUser) {
                       vm.currentUser = currentUser;
                       vm.currentUser.password = null;
                   }
                });
        }
        init();
        function update(user) {
           UserService
               .updateUser($rootScope.currentUser._id,user)
               .then(function(response){
                   var updateuser = response.data;
                   $rootScope.currentUser = updateuser;
                   $location.url("/profile");
               })
               .then(function(response) {
           });
        }

    }


})();